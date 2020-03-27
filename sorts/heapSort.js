/** 
 * heapSort
 * 堆排序
 * 不稳定
 * 时间复杂度 O(n *log n)
 * 
 * **/
const array = [50, 45, 40, 20, 25, 35, 30, 10, 15];
// 交换函数
// 建堆
// 维护堆
// 堆排序

/**
 * @param {array} arr
 * @param {number} loc1
 * @param {number} loc2
 * 目的:  在数组arr中交换 loc1 和 loc2两个位置
 * **/
const swap = (arr,loc1,loc2) => {
  const temp = arr[loc1];
  arr[loc1] = arr[loc2];
  arr[loc2] = temp;
}

/**
 * @param {array} arr
 */
const buildHeap = (arr) => {
  const length = arr.length;
  const loc = Math.floor(length/2) - 1;
  // 维护堆 [length/2] - 1开始（最后一个非叶子节点）
  for (let i = loc; i >= 0; i--) {
    heapify(arr, length, i);
  }
}

/**
 * @param {array} arr 存储堆的数组
 * @param {number} length 数组长度
 * @param {number} index 当前维护的堆元素在 arr中的下标
 */
const heapify = (arr, length, index) =>{
  /* 
    ①大顶堆 的数组元素对应关系：arr[ 2*i + 1 ]<= arr[ i ] && arr[ i ] >= arr[  2*i + 2 ]
    ②小顶堆同理：arr[ 2*i + 1 ] >= arr[ i ] &&  arr[  2*i + 2 ] >= arr[ i ]
  */
  let left = 2 * index + 1;
  let right = 2 * index + 2;
  let largest = index;
  if(left<length && arr[left] > arr[largest]){
    largest = left;
  }
  if(right<length && arr[right] > arr[largest]){
    largest = right;
  }
  // 交换后可能会影响子堆，递归处理
  if(largest !== index) { // 不相等就是发生了 堆的维护操作
    swap(arr, index, largest);
    heapify(arr, length, largest);
  }
  return arr;
}


// 排序
const heapSort = (arr = []) => {
  let length = arr.length;
  // 步骤一 构造初始堆。将给定无序序列构造成一个大顶堆（一般升序采用大顶堆，降序采用小顶堆)。
  buildHeap(arr);
  // 步骤二 将堆顶元素与末尾元素进行交换，使末尾元素最大。然后继续调整堆，再将堆顶元素与末尾元素交换，得到第二大元素。如此反复进行交换、重建、交换。
  for(let i = length-1;i>=0; i--) {
    swap(arr, 0, i);
    length--;
    heapify(arr, length, 0);
  }
  return arr;
}
console.log(heapSort(array));