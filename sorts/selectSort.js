/**
 * selectSort 
 * 不稳定 
 * 时间复杂度O(n²) 空间复杂度O(1)
 * 选择排序 利用 有序区（初值为空）+无序区 
 * 有目的的每一趟选择最大/小的目标 从无序区到有序区
 * 
 * 
 * **/
const arr = [43, 20, 17, 13, 44, 28, 14, 23, 15, 44];

const selectSort = (arr=[]) => {
  let minIndex;
  let temp;
  for (let i = 0; i < arr.length-1; i++) {
    minIndex = i;
    for (let j = i+1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // 每一趟循环之后找到一个目标元素，放进有序区
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}
console.log(selectSort(arr));