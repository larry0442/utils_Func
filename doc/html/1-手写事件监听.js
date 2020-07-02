/* 实现事件监听 兼容IE */

const EventUtil = {
  // 添加事件 目标对象/ 事件类型/ 处理函数
  addEvent: function (element, type, handler) {
    if (element.addEventListener) {
      // DOM 2
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      // IE
      element.attachEvent('on' + type, handler);
    } else {
      // dom 0
      element['on' + type] = handler;
    }
  },

  // 移除事件
  removeEvent: function (element, type, handler) {
    if (element.removeEventListener) {
      // DOM 2
      element.removeEventListener(type, handler, false);
    } else if (element.datachEvent) {
      // IE
      element.datachEvent('on' + type, handler);
    } else {
      // dom 0
      element['on' + type] = null;
    }
  },

  // 获取事件目标
  getTarget: function(event) {
    return event.target || event.srcElement;
  },

  // 获取事件引用
  getEvent: function(event){
    return event || window.event;
  },

  // 阻止事件传播(冒泡)
  stopPropagation: function (event){
    if(event.stopPropagation){
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },

  // 阻止默认事件行为
  preventDefault: function(event) {
    if(event.preventDefault){
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  }

};