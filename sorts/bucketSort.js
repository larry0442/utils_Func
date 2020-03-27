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
/** 
 * 桶排序
 * 计数排序的一种改进
 * 额外空间不用像计数排序从min-max
 * **/


 // ①遍历 根据min/max 确定桶的个数 max/10-min/10 + 1

 // ②根据映射关系 将元素放到合适的桶

 // ③对每个桶进行排序（）

 // ④输出+

// 根据数据构建映射关系 f(x,size) = [x/10] % size
let result = [];
const arr = [43, 20, 17, 13, 44, 28, 14, 23, 15, 30, 44];
const bucketSort = (arr = []) => {
  // 确定 桶的数量
  let min = 0, max = 0;
  for(let i = 0; i < arr.length; i++) {
    if( arr[i] <= min) {
      min = arr[i];
    }else if(arr[i] >= max){
      max = arr[i]
    }
  }
  const bucketNums = Math.floor((max-min)/10) + 1;
  let buckets = new Array(bucketNums).fill([]);

  // 根据映射规则分到对应的桶
  for(let i = 0; i < arr.length; i++) {
    const index = Math.floor(arr[i]/10) % bucketNums;
    buckets[index] =[...buckets[index], arr[i]];
  }

  for(let i = 0; i< buckets.length; i++) {
    if(buckets[i].length > 1) {
      // 对每个有效桶进行排序
      insertSort(buckets[i]);  
    }
    // 构建结果
    result = [...result,...buckets[i]];
  }

  return result;
}
console.log(bucketSort(arr));