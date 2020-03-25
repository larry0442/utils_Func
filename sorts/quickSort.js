/**  
 * quickSort
 * 快速排序
 * 不稳定
 * 时间复杂O(n*log n),最坏O(n²)
 * 
 * **/

const array = [43, 20, 17, 13, 44, 28, 14, 23, 15, 44];

// 分区(寻找哨兵位置)
const partition = (arr, low, high) => {
  // 默认第一个作为哨兵
  let povitkey = arr[low];
  
  while(low < high) {
    // 从后往前，直到找到比哨兵小的 元素: array[high]
    while( low < high && arr[high] >= povitkey) {
      high--;
    }
    // 比枢轴小的元素放到arr[low]
    arr[low] = arr[high];
    
    // 从前往后，直到找到第一个比枢轴大的元素
    while(low < high && arr[low] <= povitkey) {
      low++;
    }
     // 比枢轴大的元素放到arr[high]
     arr[high] = arr[low];
  }
  // 哨兵（枢轴）位置
  arr[low] = povitkey;

  // 返回正确位置
  return low;
}

/** 
 * @{ arr } 待排序数组
 * @{ low } 
 * @{ high }
 * 
 * **/
const quickSort = (arr=[], low, high) => {
  if(low < high) {
    // 分区(哨兵位置)
    let povitkeyLoc = partition(arr, low, high);
    quickSort(arr, low, povitkeyLoc - 1);
    quickSort(arr, povitkeyLoc + 1, high);

  }
  return arr;
}


console.log(quickSort(array,0, array.length-1));


