function maxArea(height) {
  if(height.length < 2) {
    return new TypeError('参数不符');
  }
  let left = 0, right = height.length - 1, maxArea = 0;
  while(left < right){
    maxArea = Math.max((right - left) * Math.min(height[left], height[right]), maxArea);
    if(height[left] <height[right]){
      left = left + 1;
    }else{
      right = right - 1;
    }
  }
  return maxArea;
};

/* 

字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
*/
const intToRoman = (num) => {
  let res = '';
  const numArr = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const strArr = ['M','CM','D', 'CD','C','XC','L','XL','X','IX','V','IV','I'];
  for(let i= 0; i< numArr.length; i++) {
    while(num >= numArr[i]) {
      num = num - numArr[i];
      res = res + strArr[i];
    }
  }
  return res;
}



var int2Roman = function(num) {
  let res = '';
  const numArr = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const strArr = ['M','CM','D', 'CD','C','XC','L','XL','X','IX','V','IV','I'];
  let temp = num;
  let times;
  for(let i = 0;i< numArr.length; i++) {
      times= ~~(temp/numArr[i]);
      temp = temp % numArr[i]; 
      while(times) {
          res = res + strArr[i];
          times = times - 1;
      }
  }
  return res;
}


// 'MMMCM' -> 3900
const romanToInt = (str) => {
  const mapper = {'M':1000,'CM': 900,'D': 500, 'CD': 400,'C':100,'XC':90,'L':50,'XL':40,'X':10,'IX':9,'V':5,'IV':4,'I':1};
  let resArr = [];
  for(let i = 0; i< str.length; i++) {
    resArr[i] = mapper[str[i]];
  }
  console.log(resArr);
  let res = resArr[0];
  if(resArr.length === 1) {
    return res;
  }
  for (let index = 1; index < resArr.length; index++) {
    if(resArr[index] >resArr[index -1]){
      res = res + resArr[index] - (2*resArr[index -1]);
    }else {
      res = res + resArr[index];
    }
    
  }
  return res;
}

// string[] 的最长公共前缀
var longestCommonPrefix = function(strs) {
  if(!strs.length) {
    return '';
  }
  let res = strs[0];
  for(let i = 0; i<strs.length; i++) {
    let j = 0;
    for(;j < res.length && j < strs[i].length; j++){
      if(res[j] !== strs[i][j]){
        break;
      }
    }
    res = res.substr(0,j);
  }
  return res;
};

// 分支法
var longestCommonPrefix1 = function(strs) {
  if(strs.length == 0){
    return '';
  }
  const length = strs.length;
  return commonPrefix(strs, 0, length-1);
}

// strs  => [strsLeft]&[strsRight] => strLeft & strRight
// 数组  => 子数组 => 子数组（只有两个字符串）
function commonPrefix(strs, left, right) {
  if(left === right) {
    // 只有一个字符串的情况
    return strs[left];
  }
  const mid = Math.floor((right + left)/2);
  const leftStrs = commonPrefix(strs, left, mid);
  const rightStrs = commonPrefix(strs, mid + 1, right);
  return prefix(leftStrs,rightStrs);
}

function prefix(strLeft, strRight) {
  // 主要逻辑： 处理两个字符串
  const minLength = Math.min(strLeft.length, strRight.length);
  for(let i = 0; i< minLength; i++) {
    if(strLeft.charAt(i) !== strRight.charAt(i)) {
      // 前面 0 ~ i-1都相等，到了i不相等 0 ~ i-1长度是 i
      return strLeft.substr(0,i)
    }
  }
  // 循环完没有return表示strLeft和strRight在前 minLength 每个字符都相等
  return strLeft.substr(0, minLength);
}
console.log(longestCommonPrefix1(["flower","flow","flight"]));