const STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
}


/**
 * 1. 初始化
 * 2. 等待、成功、失败的状态转换
 * 3. 成功的回调和失败的回调
 * 4. 实现异步存储回调，相应状态执行
 * 5. 实现链式调用 （then 函数内 return 一个新的 promise）
 * 
 * 6. promiseA+ 规范：
 *  promise/A+ 规范中规定，onFulfilled/onRejected 返回一个值 result，对 result 需要作以下处理：

      - 如果 result 与 then 方法返回的 promise 相等，抛出一个 TypeError 错误
      - 如果 result 是一个 Promise ，则保持 then 方法返回的 promise 的值与 result 的值一致
      - 如果 result 是对象或函数，则将 result.then 赋值给 then 并调用

          - 如果 then 是一个函数，则将 result 作为作用域 this 调用，并传递两个参数 resolvePromise 和 rejectPromise，如果 resolvePromise 和 rejectPromise 均被调用或者被调用多次，则采用首次调用并忽略剩余调用
          - 如果调用 then 方法出错，则以抛出的错误 e 为拒因拒绝 promise
          - 如果 then 不是函数，则以 result 为参数执行 promise

      - 如果 result 是其他值，则以 result 为参数执行 promise

      result {
        1. promise
        2. {} or function
        3. other
      }
 * 7. promise/A+ 规范中还规定，对于 promise2 = promise1.then(onFulfilled, onRejected) onFulfilled/onRejected 必须异步调用，不能同步
     - 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
     - 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的拒因
 * **/

// 函数，处理判断是否符合 PromiseA+ 规范
function handlePromise (newPromise, result, fulfill, reject) {

  // 1
  if (newPromise === result) {
    return reject(new TypeError('循环引用'));
  }

  // 2
  if (result instanceof _PromiseA) {
    result.then(
      (value) => {
        handlePromise(newPromise, value, fulfill, reject);
      },
      (e) => {
        reject(e);
      }
    )
  } else if (result !== null && (typeof result === 'object' || typeof result === 'function')) {
    // 3
    // 防止重复调用，成功和失败只能调用一次
    let called;
    // 如果 result 是对象或函数
    try {
      const then = result.then
      if (typeof then === 'function') {
        then.call(result, (y) => {
          if (called) return;
          called = true;
          // 说明 result是 promise，继续遍历
          handlePromise(newPromise, y, fulfill, reject)
        }, (r) => {
          if (called) return;
          called = true;
          reject(r)
        })
      } else {
        fulfill(result)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    // 4
    fulfill(result);
  }



}

class _PromiseA {
  constructor(fn) {

    // 初始化
    this.state = STATE.PENDING;
    this.value = null;
    this.reason = null;

    // 存储回调数组（实现异步）
    this.fulfilledCallbacks = []
    this.rejectedCallbacks = []

    // 成功和失败的状态转换处理
    const fulfill = (value) => {
      if (this.state === STATE.PENDING) {
        this.value = value;
        this.state = STATE.FULFILLED;
        this.fulfilledCallbacks.forEach(cb => cb());
      }
    }
    const reject = (reason) => {
      if (this.state === STATE.PENDING) {
        this.reason = reason;
        this.state = STATE.REJECTED;
        this.rejectedCallbacks.forEach(cb => cb());
      }
    }

    // 执行 promise，失败、出错时执行 reject(); 
    try {
      fn(fulfill, reject);
    } catch (e) {
      reject(e);
    }
  }

  // 1. 根据状态执行成功的回调或者失败的回调
  // 2. then 函数内 return 一个新的 promise 实现链式调用 onFuifilled 和 onRejected 传给新的 fulfill 和 reject
  then (onFulfilled, onRejected) {
    // promiseA+规范之7：
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e }

    const newPromise = new _PromiseA((fulfill, reject) => {
      // 实现异步，状态为 pending 时，fulfill 和 reject 的回调存储起来
      if (this.state === STATE.PENDING) {
        this.fulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const result = onFulfilled(this.value);
              handlePromise(newPromise, result, fulfill, reject);
            } catch (e) {
              reject(e);
            }
          }, 0)
        }) 
        this.rejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const result = onRejected(this.reason);
              handlePromise(newPromise, result, fulfill, reject);
            } catch (e) {
              reject(e);
            }
          }, 0)
        })
      }

      // 执行成功的回调
      if (this.state === STATE.FULFILLED) {
        setTimeout(() => {
          try {
            const result = onFulfilled(this.value);
            handlePromise(newPromise, result, fulfill, reject);
          } catch (e) {
            reject(e);
          }
        }, 0)
      }

      // 执行失败的回调
      if (this.state === STATE.REJECTED) {
        setTimeout(() => {
          try {
            const result = onRejected(this.reason);
            handlePromise(newPromise, result, fulfill, reject);
          } catch (e) {
            reject(e);
          }
        }, 0)
      }
    })
  }

  finally () {

  }
  catch () {
    
  }
}

module.exports = _PromiseA;