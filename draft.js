
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

// 数据劫持: 给key添加getter和setter
function Observe(data) {
  Object.keys(data).forEach(key => {
    // 递归进行深度数据劫持
    let val = data[key];
    deepObv(val); // 依赖收集
    let dep = new Dep();
    Object.defineProperty(data, key, {
      get() {
        // 订阅(依赖收集)
        Dep.target && dep.addSubs(Dep.target);
        return val;
      },
      set(newVal) {
        if(newVal === val){
          return;
        }
        val = newVal;
        deepObv(newVal);
        dep.notify(); // 派发更新
      }
    })
  })
}

// 递归进行深度劫持
function deepObv(data) {
  if(!data || typeof data !== 'object') {
    return;
  }
  return new Observe(data);
}

// 发布和订阅:
// 发布订阅主要靠的就是数组关系，订阅就是放入函数(依赖收集)，发布（派发更新）就是让数组里的函数执行
function Dep() {
  this.subs = [];
}
Dep.prototype = {
  // 订阅
  addSubs(sub) {
    this.subs.push(sub);
  },
  // update
  notify() {
    this.subs.forEach(sub => sub.update());
  }
}

// 监听函数
function Wacher(fn) {
  this.fn = fn;
}

Wacher.prototype.update = function() {
  this.fn();
}

const a = ['64GB', '128GB'], b=['white', 'black'], c=['yes', 'no'];
function createSku(...options) {
  const result = [];
  const dfs = (current, optionIndex)=> {
    let option = options[optionIndex];
    let isLast = optionIndex === options.length - 1;
    for(let val of option){
      let cur = current.concat(val);
      if(isLast){
        // 满足条件
        result.push(cur);
      } else {
        // 不满足条件
        dfs(cur, optionIndex+1);
      }
    }
  }
  dfs([],0);
  return result;
}
createSku(a,b,c);

function Observe(data) {
  Object.keys(data).forEach(key => {
    let val = data[key];
    Object.defineProperty(data, key, {
      get() {
        // 在这里做依赖收集，就是订阅哪一些数据引用了我们这里的value
        return val;        
      },
      set(newVal) {
        if(newVal === val){
          return;
        }
        val = newVal;
        // 深度响应
        // 派发更新 dep.notify();
      }
    })
  })
}