/** 
 * mergeSort
 * 稳定的归并排序
 * 分治策略递归求解
 * 时间复杂度O(n*log n)
 * **/

const array = [43, 20, 17, 13, 44, 28, 14, 23, 15, 44];
const mergeSort = (arr=[]) => {
  //递归停止条件
  if(arr.length < 2) {
    return arr;
  }
  let mid = Math.floor(arr.length/2);
  // 分治
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  // 合并
  const result = [];
  while(left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift()); 
    }
  }
  // 如果其中一个已经完全push入result， 那么剩下的直接push进result就行了
  while(left.length) {
    result.push(left.shift());
  }
  while(right.length) {
    result.push(right.shift());
  }

  // 返回每一个递归完成的结果
  return result;
}
console.log(mergeSort(array));