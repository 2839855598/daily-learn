// import _  from "lodash";
// const result = _.map([1,2,34],(val) => val+1 );

import './common.js';

// webpackPrefetch待首屏核心代码加载完成后，自动加载m.js,
// 防止按需加载(比如点击按钮加载) 时候，m.js文件太大，导致loading或者空白，
// 所以需要在加载完首屏核心代码后，再去加载这个文件。
import(/* webpackChunkName: "async-m", webpackPrefetch: true */'./m.js').then((m)=> {
    console.log('m is loaded');
})

const arr = [1,2,3];
const arr2 = arr.map(val => val+2);
const m = (a,b) => a+b;
let a1 = 'my name is xjc';
let k = 333;







