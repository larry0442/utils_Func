
// 定义状态
const STATE = {
  PENDING: 'pending',
  FULLFILLED: 'fullfilled', 
  REJECT: 'reject',
}

class _promise {
  constructor(fn) {
    // 初始化
    this.state = STATE.PENDING;
    this.value = null;
    this.resaon = null;

    // 回调数组
    this.fullfilledCallbacks = [];
    this.rejectCallbacks = [];

    // 状态处理转换
    // 成功
    const fullfill = (data) => {
      if (this.state === STATE.PENDING) {
        this.value = data;
        this.state = STATE.FULLFILLED;
        // 执行回调
        this.fullfilledCallbacks.forEach(cb => cb());
      }
    }
    // 失败
    const reject = (data) => {
      if (this.state === STATE.PENDING) {
        this.state = STATE.REJECT;
        this.value = data;
        // 执行回调
        this.rejectCallbacks.forEach(cb => cb());
      }
    }

    try {
      //执行
      fn(fullfill, reject);
    } catch (error) {
      reject(error);
    }
  }
  // then在constructor之外
  then(onFullfilled, onReject){
    return new _promise((fullfill, reject) => {
      // 实现回调，pending时，resolve和reject的回调都存起来
      if (this.state === STATE.PENDING) {
        // 对应上面
        this.fullfilledCallbacks.push(() => {
          fullfill(onFullfilled(this.value));
        })

        this.rejectCallbacks.push(() => {
          reject(onReject(this.value));
        })
      }

      // 执行成功的回调
      if (this.state === STATE.FULLFILLED) {
        fullfill(onFullfilled(this.value));
      }

      if(this.state === STATE.REJECT){
        reject(onReject(this.value));
      }
    });
  }
  finally(){

  }
}