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


// '101' (5)=> 1
// odd => +1
// even => /2

// 5=> 5+1=> (5+1)/2 => 3+1 => (3+1)/2= 2/2 =>1
const numSteps = (s) => {
  let arr = s.split('');
  let steps = 0;
  while(arr.length !== 1){
    // 偶数 二进制末位0、奇数二进制末位1 
    if(arr[arr.length-1] === '0'){
      arr.pop(); 
    }else {
      addOne(arr);
    }
    steps++;
  }
  return steps;
}
const addOne = (arr) => {
  let flag = false; // 进位标识
  let maxIndex = arr.length -1;
  arr[maxIndex] = '0';
  for(let i = maxIndex-1; i>=0; i--){
    if(arr[i] === '1'){
      // 进位
      arr[i] = '0';
      flag = true;
    } else {
      arr[i] = '1';
      flag = false;
      break;
    }
    if(flag){
      // 有进位
      arr.unshift('1')
    }
  }
  return arr;
}

// dp算法
/**
 * stoneValue : number []
 * 每次可以取走1,2，或者3个数
 * 最后累计判断和最大为胜
 * dp[i] 表示我在i~末尾中，我能赢对面多少分，
 * 在 i这个位置，我尽量赢对面多的分
 * 那么，在i+1这个位置，对方也是采取最优策略，也会尽量赢我们
 * 所以就是看谁一开始就占尽优势
 * 只要dp[0] 是 大于 0 ,那我就赢了呀
 * **/
const stoneGame = (stoneValue) => {
  const length = stoneValue.length;
  const dp = new Array(length+3).fill(0);
  stoneValue.push(0);
  stoneValue.push(0);
  for(let i = length-1; i>=0; i--) {
    const x = stoneValue[i] - dp[i+1];
    const y = stoneValue[i] + stoneValue[i+1] - dp[i+2];
    const z = stoneValue[i] + stoneValue[i+1] + stoneValue[i+2] - dp[i+3];
    dp[i] = Math.max(x, y, z);
    console.log(dp[i]);
  }
  return dp;
}

// 返回满足a+b+c = 0;
/** 
 * 1: x = 0;
 * 2: a, b = -a
 * 3: a, b, c = -(a+b);
 * 暴力法  n^3
 * 预排序 + 双指针 O(n^2*logn)
 **/
var threeSum = function(nums) {
  let result = [];
  nums = nums.sort((a,b)=> a - b );
  if(nums.length <3) {
    return result;
  }
  let length = nums.length;
  for(let i = 0; i<length-2; i++) {
    if(i>0  && nums[i] === nums[i-1]){
      continue;// 避免重复的值i = -1, i+1 = -1 时计算，但是 i = -1, i-1 = -1时，跳过，因为前面i-1时已经计算
    }
    if(nums[i]>0) {
      break;
    }
    j = i+1,
    k = length -1;
    while(j<k) {
      const sum = nums[i]+ nums[j]+nums[k];
      if(sum === 0){
        result.push([nums[i], nums[j], nums[k]]);
        while(nums[j] === nums[j+1]) {
          j++;
        }
        while(nums[k] === nums[k-1]) {
          k--;
        }
        k--;
      }else if(sum > 0){
        k--;
      }else{
        j++;
      }
    }
  }
  return result;
};
// console.log(threeSum([-1,0,1,2,-1,-4]))

var threeSumClosest = function(nums, target) {
  let result = 0;
  let diff = Infinity;
  nums = nums.sort((a,b)=> a - b );
  if(nums.length <3) {
    return result;
  }
  let length = nums.length;
  for(let i = 0; i<length-2; i++) {
    if(i>0  && nums[i] === nums[i-1]){
      continue;// 避免重复的值i = -1, i+1 = -1 时计算，但是 i = -1, i-1 = -1时，跳过，因为前面i-1时已经计算
    }
    j = i+1,
    k = length -1;
    while(j<k) {
      const sum = nums[i]+ nums[j]+nums[k];
      const tmp = Math.abs(sum - target);
      if(tmp < diff){
        diff = tmp;
        result = sum;
      }else if(sum > target){
        k--;
      }else{
        j++;
      }
    }
  }
  return result;
};
// 
const fullParseArr = (nums) => {
  if(!nums.length) {
    return [];
  }
  const length = nums.length;
  const current=[],result = [];
  const dfs = (current) => {
    if(current.length === length){
      result.push(current);
      return;
    }
    for(let i = 0; i<length;i++){
      if(current.indexOf(nums[i]) === -1){
        current.push(nums[i]);
        dfs(current.slice());
        current.pop();
      }
    }
  }
  dfs(current);
  return result;
}

const ParseStr = (strs) => {
  if(!strs.length) {
    return [];
  }
  const length = strs.length;
  const current='',result = [];
  const dfs = (current) => {
    if(current.length === length){
      result.push(current);
      return;
    }
    for(let i = 0; i<length;i++){
      if(current.indexOf(strs[i]) === -1){
        dfs(current+strs[i]);
      }
    }
  }
  dfs(current);
  return result;
}
/**
 * 输入包含2~9的字符串 
 * 2：'abc'
 * 3: 'def'
 * 4: 'ghi'
 * 5: 'jkl'
 * 6: 'mno'
 * 7: 'pqrs'
 * 8: 'tuv'
 * 9: 'wxyz'
 * **/
var letterCombinations = function(digits) {
  if(!digits.length){
    return [];
  }
  const hMap = {
    2:'abc',
    3:'def',
    4:'ghi',
    5:'jkl',
    6:'mno',
    7:'pqrs',
    8:'tuv',
    9:'wxyz',
  }
  const length = digits.length;
  let current = '',
    result = [];
  const dfs = (k, current) =>{
    if(current.length === length) {
      result.push(current);
      return;
    }
    // 注意index = k;是为了避免出现 aa这样的重复项
    for(let index = k; index < digits.length; index++){
      const digit = digits[index];
      for(let i = 0; i<hMap[digit].length;i++) {
        current = current+ hMap[digit][i];
        dfs(index+1, current);
        current = current.substr(0,current.length-1);  
      }
    }
  }
  dfs(0, current);
  return result;
};

const letterSpread = (str) => {
  const length = str.length;
  let current = '', result = [];
  const dfs = (current) => {
    if(current.length === length) {
      result.push(current);
      return;
    }
    for(let i = 0; i< length; i++) {
      if(current.indexOf(str[i]) == -1){
        current = current + str[i];
        dfs(current);
        current = current.substr(0, current.length -1)
      }
     
    }
  }
  dfs(current);
  return result;

}
// console.log(letterSpread('abcd'));