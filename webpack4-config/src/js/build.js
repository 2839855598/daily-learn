"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _from = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/from"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _set = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/set"));

var a = 22;

var are = function are() {
  console.log('2333');
};

are();
var s1 = new _set.default();
var p = new _promise.default(function (resolve, reject) {
  //做一些异步操作
  setTimeout(function () {
    console.log('执行完成Promise');
    resolve('要返回的数据可以任何数据例如接口返回数据');
  }, 2000);
});
var arr1 = (0, _from.default)({
  length: 3
}, function (val, key) {
  return key + 1;
});
var arr2 = [1, 2, 4].map(function (val) {
  return val + 1;
});
console.log(arr1, arr2);
console.log([1, 2, 3].includes(2));
var ar3 = [1, 2, 3, 5];
console.log(ar3.entries());
