/**
 * 判断JavaScript数据类型的方法
 * **/
const Type = (function () {
  const types = {};
  const supperTypes = [
      'Symbol',
      'BigInt',
      'String',
      'Number',
      'Boolean',
      'Null',
      'Undefined',
      'Object',
      'Function',
      'Array',
      'Date',
      'RegExp'
  ];

  for (let type of supperTypes) {
    types[`is${type}`] = function (data) {
      return Object.prototype.toString.call(data) === `[object ${type}]`;
    }
  }

  return types;
})();

// console.log(Type.isRegExp(/s+/))

/* 
① typeof 运算符判断类型，局限性在 typeof undefined === 'undefined' ,但是 null, RegExp 以及 Date，Error 这些类型的检测出来都是 object

② instanceof 检测的是原型，判断检测值是否为被检测值的实例

③ Object.prototype.call()，是 Object 的原型方法，所以

检测返回的是 [object Number] 类似的结果

④ constructor 属性可以检测出实例对象是由哪一个构造函数产生的,即原型对象与构造函数之间的关系，
  但是这个原型对象是可以改的，有可能原型对象修改了，但是constructor没有一起修改，这个时候就会检测出错

  e.g: 'string'.constructor === String  // true

  String,
  Boolean,
  Array,
  HtmlDocument,
  window,
  Number,
  Function,
  Date,
  RegExp,
  Error
*/
