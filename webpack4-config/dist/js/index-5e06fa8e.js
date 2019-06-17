(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["index"],{

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ \"./src/js/common.js\");\n// import _  from \"lodash\";\n// const result = _.map([1,2,34],(val) => val+1 );\n // webpackPrefetch待首屏核心代码加载完成后，自动加载m.js,\n// 防止按需加载(比如点击按钮加载) 时候，m.js文件太大，导致loading或者空白，\n// 所以需要在加载完首屏核心代码后，再去加载这个文件。\n\n__webpack_require__.e(/*! import() | async-m */ \"async-m\").then(__webpack_require__.bind(null, /*! ./m.js */ \"./src/js/m.js\")).then(function (m) {\n  console.log('m is loaded');\n}); // 动态加载b.js\n\n__webpack_require__.e(/*! import() | async-b */ \"async-b\").then(__webpack_require__.bind(null, /*! ./b.js */ \"./src/js/b.js\")).then(function (b) {\n  console.log('this is b');\n});\nvar arr = [1, 2, 3];\nvar arr2 = arr.map(function (val) {\n  return val + 2;\n});\n\nvar m = function m(a, b) {\n  return a + b;\n};\n\nvar a1 = 'my name is xjc';\nvar k = 333;\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

},[["./src/js/index.js","mainfest","es6-demand","index~main"]],["async-m"]]);