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
      'Date'
  ];

  for (let type of supperTypes) {
    types[`is${type}`] = function (data) {
      return Object.prototype.toString.call(data) === `[object ${type}]`;
    }
  }

  return types;
})();