/**
* bubbleSort 
* 冒泡排序： 平均时间复杂度O(n²) 最好 O(n), 最坏O(n²)，稳定排序
**/
const arr = [43, 20, 17, 13, 44, 28, 14, 23, 15, 44];

const bubbleSort = (arr=[])=>{
  let temp;
  for (let i = 0; i< arr.length-1; i++) {
    for(let j = 0; j<arr.length-1-i; j++) {
      if(arr[j] > arr[j+1]) {
        temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      } 
    }
  }
  return arr;
}
console.log(bubbleSort(arr));