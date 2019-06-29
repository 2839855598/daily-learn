
import './common.js';

import './m.js';

import $ from 'jquery';

// 动态加载b.js
import(/*webpackChunkName:'async-b'*/'./b.js').then((b)=> {
    console.log('this is b');
});

$('#btn').on('click', () => {
    alert('this is index');
});

const arr = [1,2,3];
const arr2 = arr.map(val => val+2);
const m = (a,b) => a+b;
let a1 = 'my name is xjc';
let k = 333;







