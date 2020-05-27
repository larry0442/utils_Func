1. 什么是 MVVM
   MVVM 是 model - view viewModel 的简称，主要目的是分离视图（view） 和模型（model），双向数据绑定
   - 低耦合
   - 可重用
   - 独立开发 
2. vue 2.x实用Object.defineProperty 进行数据劫持，进行双向数据绑定，可以做到数据更新，视图也会更新。
3. 为什么要进行数据劫持
   
   >vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。(get中做依赖收集，就是有哪些使用到了我这里的响应式对象， set中做派发更新，我的之更改了，我要告诉所有依赖我这个响应式对象的watcher，做一次update())
   - 观察对象，给对象增加Object.defineProperty.
   - vue 特点是不能新增不存在的属性，不存在的属性没有get和set.
   - 深度响应 因为每次赋予一个新对象时会给这个新对象增加defineProperty(数据劫持).
```js
// 简单的双向数据绑定思想实现代码
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
```