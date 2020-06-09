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
 * **/
class _Promise {
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
    return new _Promise((fulfill, reject) => {
      // 实现异步，状态为 pending 时，fulfill 和 reject 的回调存储起来
      if (this.state === STATE.PENDING) {
        this.fulfilledCallbacks.push(() => {
          onFulfilled(this.value);
        })
        this.rejectedCallbacks.push(() => {
          onRejected(this.reason);
        })
      }

      // 执行成功的回调
      if (this.state === STATE.FULFILLED) {
        fulfill(onFulfilled(this.value));
      }

      // 执行失败的回调
      if (this.state === STATE.REJECTED) {
        reject(onRejected(this.reason));
      }
    })
  }

  // 1, 返回是一个promise，谁先完成就返回谁
  // 2. 输入是一组promise
  race (promises) {
    const promiseArr = Array.from(promises);
    //
    return _Promise((resolve, reject) => {
      if (promiseArr.length === 0) {
        return;
      } else {
        promiseArr.forEach(promise => {
          promise.then(resolve, reject);
        })
      }
    })
  }

  // all
  all (promises) {
    return new _Promise((resolve, reject) => {
      let result = [];
      let promiseIndex = 0;
      let promiseLength = promises.length;
      for (let p of promises) {
        // .then中收集数据，并添加.catch
        Promise.resolve(p).then((res) => {
          promiseIndex = promiseIndex + 1;
          result[promiseIndex] = res;
          if(promiseIndex === promiseLength){
            return resolve(results);
          }
        })
          .catch(reject);
      }
    })
  }

  // finally 表示不管resolve还是reject,finally中的回调都应该会调用。
  finally(callback){
    return this.then(
      value => _Promise.resolve(callback).then(() => value),
      reason => _promise.resolve(callback).then(() => reason)
    )
  }

}

module.exports = _Promise;