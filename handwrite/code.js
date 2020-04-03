/**
 * 递归实现 长度为5的数组， 元素为2~32不重复随机数
 * **/

function randomArr (arr, loc) {
  if (loc >= 5) return arr;
  if (!arr[loc]) {
    let num = Math.floor(Math.random() * (31) + 2);
    if (arr.includes(num)) {
      return randomArr(arr, loc);
    } else {
      arr[loc++] = num;
      return randomArr(arr, loc);
    }
  }
}
// console.log(randomArr(new Array(5), 0));


// 递归实现数组扁平化
const arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
function _flat (arr) {
  const res = [];
  if (!Array.isArray(arr)) {
    return TypeError('参数错误');
  }
  arr.forEach(element => {
    if (Array.isArray(element)) {
      res = res.concat(_flat(element));
    } else {
      res.push(element);
    }
  });
  return res;
}


// 参数 str, dir
// 可以根据传入参数去除 指定方向的空格(前、后、前后、中间)
let str = ' a s bn  d h f ';
/**
 * /^[\s]+/g 前
 * /([\s]*)$/g; 后
 * /^([\s]+)|([\s]*)$/g  前后
 * /(\w)(\s+)(\w)/, `$1$3`)/ 中间（匹配中间空格两边非空，去除中间空格）需要递归解决
 * **/

function trimStr (str, dir) {
  let reg;
  switch (dir) {
    case 'left':
      reg = /^[\s]+/g;
      break;
    case 'right':
      reg = /([\s]*)$/g;
      break;
    case 'both':
      reg = /^([\s]+)|([\s*]$)g/;
      break;
    case 'middle':
      reg = /(\S)(\s+)(\S)/g;
      break;
    default:
      reg = /s+/;
      break;
  }
  if (dir === 'middle') {
    while (str.match(reg) !== null) {
      str = str.replace(reg, '$1$3');
    }
    return str;
  }
  return str.replace(reg, '');
}


//  console.log(trimStr(str, 'middle'));


/**
 * coins =  [1, 2, 5], amount = 11
 * 最少硬币数/组成 amount
 * 解决 f(n)
 * 最后一枚硬币是 1, f(n) = 1 + f(n-1)
 * 最后一枚硬币是 2, f(n) = 1 + f(n-2)
 * 最后一枚硬币是 5, f(n) = 1 + f(n-5)
 * 所以 f(n) = min( f(n-1), f(n-2), f(n-5)) + 1;
 * 
 * **/

 // 递归 数字变大，就会变得很慢

 function func(n) {
   if(n === 0) {
     return 0;
   }else if( n< 0){
     return Infinity;
   }
   return Math.min(Math.min(func(n-1), func(n-2)), func(n-5)) + 1;
 }

// 优化递归存在的重复计算的问题
// 比如 f(12) = min{ f(11), f(10), f(7)} 计算了一遍f(10)
// 而递归计算f(11)时，又计算了一遍 f(10)

function check(n) {
  let min;
  let cacheMap = new Array(n+1).fill(Infinity); 
  cacheMap[0] = 0;
  function checkmap(n) {
    if(n<0){
      return Infinity;
    }else if(n === 0) {
      return 0;
    }
    if(cacheMap[n] !== Infinity) {
      return cacheMap[n];
    } else {
      min = Math.min(Math.min(checkmap(n-1), checkmap(n-2)), checkmap(n-5)) + 1 ;
      cacheMap[n] = min;
      return min;
    }
  }
  return checkmap(n);
}

console.log(check(60));