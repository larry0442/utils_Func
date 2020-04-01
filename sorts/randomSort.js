/**
 * 随机洗牌
 * 可以使用 {shuffle} from 'lodash' 
 * **/
const randomSort = (arr=[]) => {
  const length = arr.length;
  for(let index = 0; index < length; index++) {
    let randomIndex = Math.floor(Math.random()*(length - index)) + index;
    [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]]
  }
  return arr;
}