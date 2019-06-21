(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["index"],{

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./src/js/common.js");
/* harmony import */ var _m_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./m.js */ "./src/js/m.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);


 // 动态加载b.js

__webpack_require__.e(/*! import() | async-b */ "async-b").then(__webpack_require__.bind(null, /*! ./b.js */ "./src/js/b.js")).then(function (b) {
  console.log('this is b');
});
jquery__WEBPACK_IMPORTED_MODULE_2___default()('#btn').on('click', function () {
  alert('this is index');
});
var arr = [1, 2, 3];
var arr2 = arr.map(function (val) {
  return val + 2;
});

var m = function m(a, b) {
  return a + b;
};

var a1 = 'my name is xjc';
var k = 333;

/***/ }),

/***/ "./src/js/m.js":
/*!*********************!*\
  !*** ./src/js/m.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
console.log('this is m'); // webpackPrefetch待首屏核心代码加载完成后，自动加载c.js,
// 防止按需加载(比如点击按钮加载) 时候，c.js文件太大，导致loading或者空白，
// 所以需要在加载完首屏核心代码后，再去加载这个文件。

__webpack_require__.e(/*! import() | async-c */ "async-c").then(__webpack_require__.bind(null, /*! ./c.js */ "./src/js/c.js")).then(function (c) {
  console.log('c is loaded');
});
/* harmony default export */ __webpack_exports__["default"] = ('m.js');

/***/ })

},[["./src/js/index.js","mainfest","es6-demand","vendors","initial-common"]],["async-c"]]);
//# sourceMappingURL=index-91afd138.js.map