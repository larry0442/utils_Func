const randomSort = (arr=[]) => {
  const length = arr.length;
  for(let index = 0; index < length; index++) {
    let randomIndex = Math.floor(Math.random()*(length - index)) + index;
    [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]]
  }
  return arr;
}

console.log(randomSort([1,2,3,4,5,6,7,8,9]));

const lodash  = require('lodash');
console.log(lodash.shuffle([1,2,3,4,5,6,7,8,9]));

function _new() {
  let newObj =  null,
      constructor = Array.prototype.shift.call(arguments),
      result = null;
  if(typeof constructor !== 'function') {
    return;
  }
  newObj = Object.create(constructor.prototype);

   // 将 this 指向新建对象，并执行函数
  result = constructor.apply(newObj, arguments);
  
  let flag = result && (typeof result === 'object' || typeof result === 'function');
  return flag ? result: newObj;
}