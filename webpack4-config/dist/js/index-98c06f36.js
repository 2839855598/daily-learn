(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["index"],{

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/main.css */ \"./src/css/main.css\");\n/* harmony import */ var _css_main_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_main_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _css_font_awesome_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/font-awesome.css */ \"./src/css/font-awesome.css\");\n/* harmony import */ var _css_font_awesome_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_font_awesome_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _css_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css/base.css */ \"./src/css/base.css\");\n/* harmony import */ var _css_base_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_base_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common.js */ \"./src/js/common.js\");\n/* harmony import */ var _m_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./m.js */ \"./src/js/m.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_5__);\n // 字体样式\n\n\n\n\n\n // 动态加载b.js\n\n__webpack_require__.e(/*! import() | async-b */ \"async-b\").then(__webpack_require__.bind(null, /*! ./b.js */ \"./src/js/b.js\")).then(function (b) {\n  console.log('this is b');\n});\njquery__WEBPACK_IMPORTED_MODULE_5___default()('#btn').on('click', function () {\n  alert('this is index');\n});\nvar arr = [1, 2, 3];\nvar arr2 = arr.map(function (val) {\n  return val + 2;\n});\n\nvar m = function m(a, b) {\n  return a + b;\n};\n\nvar a1 = 'my name is xjc';\nvar k = 333;\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/m.js":
/*!*********************!*\
  !*** ./src/js/m.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconsole.log('this is m'); // webpackPrefetch待首屏核心代码加载完成后，自动加载c.js,\n// 防止按需加载(比如点击按钮加载) 时候，c.js文件太大，导致loading或者空白，\n// 所以需要在加载完首屏核心代码后，再去加载这个文件。\n\n__webpack_require__.e(/*! import() | async-c */ \"async-c\").then(__webpack_require__.bind(null, /*! ./c.js */ \"./src/js/c.js\")).then(function (c) {\n  console.log('c is loaded');\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = ('m.js');\n\n//# sourceURL=webpack:///./src/js/m.js?");

/***/ })

},[["./src/js/index.js","mainfest","es6-demand","vendors","initial-common"]],["async-c"]]);