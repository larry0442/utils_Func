const randomSort = (arr=[]) => {
  const length = arr.length;
  for(let index = 0; index < length; index++) {
    let randomIndex = Math.floor(Math.random()*(length - index)) + index;
    [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]]
  }
  return arr;
}

function deepClone(obj) {
  let newObj = Array.isArray(obj) ? [] : {};
  for( let key in obj) {
    if(obj.hasOwnProperty(key)){
      newObj[key] = typeof obj[key] === 'object'? deepClone(obj[key]) : obj[key];
    }
  }
  return newObj;
}

Function.prototype.myCall = function(context) {
  if(typeof this !== 'function') {
    throw new Error('typeError');
  }
  let result = null;
  context = context || window;

  let args = [...arguments].slice(1);
  context.fn = this;
  result = context.fn(...args);//call ：  一个一个参数传进
  delete context.fn;
  return result;
}

Function.prototype.myApply = function(context) {
  if(typeof this !== 'function') {
    throw new Error('typeError');
  }
  let result = null;
  context = context || window;
  context.fn = this;
  if(arguments[1]) {
    result = context.fn(...arguments[1]);
  }else {
    result = context.fn();
  }

  return result;
}

Function.prototype.myBind = function(context) {
  let args = [...arguments].slice(1);
  let fn = this;
  return function Fn() {
    return fn.apply(
      this instanceof Fn? this: context,
      args.concat(...arguments)
    )
  }
}
function curry() {
   // 第一次执行时，定义一个数组专门用来存储所有的参数
  let args = Array.prototype.slice.call(arguments);
  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  let _adder = function() {
    args.push(...arguments);
    return _adder;
  }
   // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
  _adder.toString = function () {
    return _args.reduce(function (a, b) {
        return a + b;
    });
  }
  return _adder;
}