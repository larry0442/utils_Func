/**
 * insertSort
 * 时间复杂度：O(n²)
 * 稳定排序
 * 已排好序的，为待排序元素 让位（逐个往后挪）
 * **/

const array = [43, 20, 17, 13, 44, 28, 14, 23, 15, 44];

const insertSort = (arr = []) => {

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i-1;
    while(j>=0 && arr[j] > key){
      arr[j+1] = arr[j];
      j--;
    }
    arr[j+1] = key;
  }
  return arr;
}
console.log(insertSort(array));