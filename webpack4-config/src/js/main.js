
import "../css/main.css"
import "../css/a.scss";
// 字体样式
import "../css/font-awesome.css"

import "../css/base.css"

import * as math from 'mathjs';


import './common.js';

import axios from 'axios';

import {add} from './k';

console.log(add(1,2));

axios.get('/mock/5c03dec03b23d255f07eca44/example/comments')
    .then((res) =>  {
        console.log(res);
    })

console.log(math.add(math.sqrt(4),2));





var bt1 = document.querySelector('.btn');
// 异步按需加载，点击按钮才会加载lodash
bt1.addEventListener('click', function(){
    import(/*webpackChunkName:'async-lodash'*/'lodash').then((lodash)=> {
        console.log('this is lodash');
    })

});

// 动态加载b.js
import(/*webpackChunkName:'async-b'*/'./b.js').then((b)=> {
    console.log('this is b');
})


const are = () => {
    console.log('2333600999');
}
are();



const s1 = new Set();

let p = new Promise(function(resolve, reject){
    //做一些异步操作
    setTimeout(function(){
        console.log('执行完成Promise');
        resolve('要返回的数据可以任何数据例如接口返回数据');
    }, 2000);
});
const arr1 = Array.from({length: 3}, (val,key) => key+1);
const arr2 = [1,2,4].map(val => val+1);

console.log(arr1,arr2);
console.log([1,2,3].includes(2));


const ar4 = [1,2,4];
const m5 = new Map();
