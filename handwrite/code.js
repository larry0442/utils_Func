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

function func (n) {
  if (n === 0) {
    return 0;
  } else if (n < 0) {
    return Infinity;
  }
  return Math.min(Math.min(func(n - 1), func(n - 2)), func(n - 5)) + 1;
}

// 优化递归存在的重复计算的问题
// 比如 f(12) = min{ f(11), f(10), f(7)} 计算了一遍f(10)
// 而递归计算f(11)时，又计算了一遍 f(10)

function check (n) {
  let min;
  let cacheMap = new Array(n + 1).fill(Infinity);
  cacheMap[0] = 0;
  function checkmap (n) {
    if (n < 0) {
      return Infinity;
    } else if (n === 0) {
      return 0;
    }
    if (cacheMap[n] !== Infinity) {
      return cacheMap[n];
    } else {
      min = Math.min(Math.min(checkmap(n - 1), checkmap(n - 2)), checkmap(n - 5)) + 1;
      cacheMap[n] = min;
      return min;
    }
  }
  return checkmap(n);
}

/**
 * dp:[0][1][1][2][2] [1][2][2][3][3] [2][3][3][4][4] [3][..]
 * f(n) = min{ f(n-5) + 1, f(n-2) + 1, f(n-1)+1 }
 *
 * **/

const coinChange = (coins, amount) => {
  // 初始化备忘录,用Infinity填满备忘录，Infinity说明该值不可以用硬币凑出来
  const dp = new Array(amount + 1).fill(Infinity)

  // 设置初始条件为 0
  dp[0] = 0

  for (var i = 1; i <= amount; i++) {
    // 计算最后一枚为coin面值时的动态转移
    for (const coin of coins) {
      // 根据动态转移方程求出最小值
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1)
      }
    }
  }

  // 如果 `dp[amount] === Infinity`说明没有最优解返回-1,否则返回最优解
  return dp[amount] === Infinity ? -1 : dp[amount]
}

/**
 * 移除字符串最后一个指定的目标字符串
 * 使用字符串方法
 * **/
function delLastString (str, target) {
  let index = str.lastIndexOf(target);
  if (index > -1) {
    return str.slice(0, index) + str.slice(index + 1);
  }
  return str;
}

/***
 * 正则 / 字符串处理
 * 将下划线_命名改为大驼峰命名
 * dufbh_edjrf  --> DufbhEdjrf
*/
function toCamelCase (str) {
  const reg = /(^|_)(\w)/g;
  return str.replace(reg, (match, $1, $2) => $2.toUpperCase());
}
function strToCamelCase (str) {
  return str
    .split('_')
    .map(item => {
      if (item === '') {
        return '_'
      }
      return item[0].toUpperCase() + item.slice(1);
    })
    .join('');
}

/**
 * 大小写转换
 * **/
function transCode (str) {
  return str.replace(/([a-z]*)([A-Z]*)/g, (m, $1, $2) => {
    return $1.toUpperCase() + $2.toLowerCase();
  })
}

function transCode1 (str) {
  if (!str.length) {
    return 'error!'
  }
  return str.split('').map(item => {
    let temp = item.charCodeAt();
    if (97 <= temp <= 122) {
      return item.toUpperCase();
    }
    if (65 <= temp <= 90) {
      return item.toLowerCase();
    }
    return item;
  }).join('');
}

/**
 * 统计目标字符串在指定字符串出现的次数
 * aaabdcaasda  aa在其中出现 3次
 *
 * **/
function getTotalStr (str, target) {
  let count = 0;
  if (!target) {
    return count;
  }
  while (str.includes(target)) {
    count++;
    str = str.substring(str.indexOf(target) + 1);
  }
  return count;
}
function getTotalStrByReg (str, target) {
  // 正向零宽断言 假设等于target·
  const matchs = str.match(new RegExp(`(?=${target})`, 'g'));
  return matchs ? matchs.length: 0;
}


/**
 * 实现字符串的简单加密和解密
 * **/
var aa = "Hello world!";
String.prototype.encrypt = function(salt=8) {
  let str = '';
  for(let i=0; i<this.length; i++) {
    str+= String.fromCharCode(this.charCodeAt(i)+salt);
  }
  return str;
}; //添加到String原型链.

String.prototype.decrypt = function(salt=8) {
  let str = '';
  for(let i=0; i<this.length; i++) {
    str+= String.fromCharCode(this.charCodeAt(i)-salt);
  }
  return str;
}; //添加到String原型链.


/**
 * 获取网页当前url的查询字符串
 * 
 * **/
const getSearchParam = (param) => {
  const search = window.location.search;
  let res = {};
  search.slice(1).split('&').forEach(item=> {
    const [key, value] = item.split('=');
    res[key] = value;
  })
  return res[param];
}


// 手写call函数
/* 
  首先call()的参数为：thisArg,arg1,arg2,...argn
*/
Function.prototype.callFn = function(context) {
  // 参数判断，没有则指向window
  context = contenxt || window;

  // 获取参数，去除第一个this指向，剩余取出来要作为参数给fn
  let args = [...arguments].slice(1);

  // 给context 添加一个方法，指向this
  context.fn = this;

  // 传入参数，作为调用call函数的外部函数的参数
  context.fn(...args);
  
  // 删除fn属性
  delete context.fn;
  
}

// 手写apply函数
Function.prototype.applyFn = function(context) {
  context = context || window;

  // 参数
  let args = [...arguments].slice(1);

  context.fn = this;

  context.fn(args);
}

// 手写bind， 
Function.prototype.bindFn = function(context) {
  // 调用bind的一定是个函数，否则出错
  if (typeof this !== "function") {
    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
  }
  let self = this;
  // 参数
  let args = [...arguments].slice(1);
  return function() {
    let newArgs = [...arguments];
    return self.apply(context, [args, ...newArgs]);
  }
}

// new 函数

/* 
  1. 创建一个新对象
  2. 将构造函数的作用域赋给新对象
  3. 执行构造函数中的代码
  4. 返回新对象
*/

let newMethod = function(parent, ...rest) {
  // 创建新对象
  let child = Object.create(parent.prototype);
  // this调用参数传给构造函数
  let result = parent.apply(child, rest);

  //注意点， 构造函数没有显式返回对象时返回我们创建的对象
  return typeof result === 'object' ? (result || child) : child;
}