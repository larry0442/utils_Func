const method = 'get';
const url = 'http://jjjjj.com/index';
// 创建
const XHR = window.XMLHttpRequest? new XMLHttpRequest: new ActiveXObjext('Microsoft.XMLHTTP');
// 监听
XHR.onreadyStateChange = function(){
  if(XHR.readyState === 4 && XHR.status === 200){
    console.log(XHR.responsetXML);
  }
}
// 配置
XHR.open(method, url, ture);
//发送
XHR.send(null);

/* open 放在open之后，是为了兼容。JavaScript高级程序设计中有提及 */
