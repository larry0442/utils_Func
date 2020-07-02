const method = 'get';
const url = 'http://jjjjj.com/index';
// 创建
const XHR = window.XMLHttpRequest? new XMLHttpRequest: new ActiveXObjext('Microsoft.XMLHTTP');
// 配置
XHR.open(method, url, ture);
//发送
XHR.send(null);

// 监听
XHR.onreadyStateChange = function(){
  if(XHR.readyState === 4 && XHR.status === 200){
    console.log(XHR.responsetXML);
  }
}
