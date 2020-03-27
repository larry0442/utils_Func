/**
 * 计数（非比较排序）输入数据必须是整数
 * 开辟空间
 * 
 * **/
const array = [43, 20, 17, 13, 44, 28, 14, 23, 15, 44];

const countingSort = (arr = []) => {
  let maxValue = 0;
  for(let i=0;i<arr.length; i++) {
    if(maxValue < arr[i]){
      maxValue = arr[i];
    }
  }
  // 
  let result = [];
  let tempArr = new Array(maxValue);
  for(let i = 0; i < arr.length; i++) {
    if(!tempArr[arr[i]]) {
      tempArr[arr[i]] = 0;
    }
    tempArr[arr[i]]++;
  }
  for(let i = 0; i < tempArr.length; i++) {
    while(tempArr[i] > 0 ) {
      result.push(i);
      tempArr[i]--;
    }
  }
  return result;
}
console.log(countingSort(array));