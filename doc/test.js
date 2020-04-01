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