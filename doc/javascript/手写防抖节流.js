// 防抖 顾名思义，防止抖动，以免把一次事件误认为多次，敲键盘就是一个每天都会接触到的防抖操作。
// 1. 登录、发短信等按钮避免用户点击太快，以致于发送了多次请求，需要防抖
// 2. 调整浏览器窗口大小时，resize 次数过于频繁，造成计算过多，此时需要一次到位，就用到了防抖
// 3. 文本编辑器实时保存，当无任何更改操作一秒后进行保存
function debounce(fn, wait) {
  // debounce 的重点在清零
  let timer = null;
  return function() {
    let context = this;
    let args = arguments;

  }
}

// 函数节流
// // 如果两次时间间隔超过了指定时间，则执行函数。
function throttle(fn, delay){
  let preTime = Date.now();
  return function() {
    let context = this;
    let args = arguments;
    let nowTime = Date.now();
    if(nowTime - preTime > delay){
      fn.apply(context, args);
      preTime = Date.now();
    }
  }
}