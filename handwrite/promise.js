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
      if(this.state === STATE.PENDING) {
        this.value = value;
        this.state = STATE.FULFILLED;
        this.fulfilledCallbacks.forEach(cb=> cb());
      }
    }
    const reject = (reason) => {
      if(this.state === STATE.PENDING) {
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
  then(onFulfilled, onRejected) {
    return new _Promise((fulfill, reject) => {
      // 实现异步，状态为 pending 时，fulfill 和 reject 的回调存储起来
      if(this.state === STATE.PENDING) {
        this.fulfilledCallbacks.push(() => {
          fulfill(this.onFulfilled(this.value));
        })
        this.rejectedCallbacks.push(() => {
          reject(this.onRejected(this.reason));
        })
      }

      // 执行成功的回调
      if(this.state === STATE.FULFILLED) {
        fulfill(onFulfilled(this.value));
      }

      // 执行失败的回调
      if(this.state === STATE.REJECTED) {
        reject(onRejected(this.reason));
      }
    })
  }

  finally() {
    
  }
}

module.exports = _Promise;