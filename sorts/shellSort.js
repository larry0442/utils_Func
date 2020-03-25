/** 
 * shellSort
 * 不稳定
 * 插入排序的改进版
 * 不断减少增量，并对子序列使用插入排序
 * 逐步减少增量 1次循环
 * 每个增量下遍历数组 1次循环
 * 每次数组遍历对应的一组 数据 进行插入排序 1次循环
 * **/

const array = [43, 20, 17, 13, 44, 28, 14, 23, 15, 44];

const shellSort = (arr = []) => {
  let gap = 1;
  let temp, i, j ;
  let length = arr.length;
  // 根据arr,动态设置间隔
  while(gap < length/5) {
    gap = gap * 5 + 1;
  }
  // 逐步减少增量
  for (gap; gap>0; gap = Math.floor(gap/5)) {
    // 插入排序
    for(i = gap; i < length; i++) {
      temp = arr[i];
      for(j = i-gap; j>=0 && arr[j]>temp; j -= gap) {
        arr[j+gap] = arr[j]
      }
      arr[j+gap] = temp;
    }
  }
  return arr;
}
console.log(shellSort(array));
