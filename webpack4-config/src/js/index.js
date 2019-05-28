import "../css/main.css";

const a = 22;
const are = () => {
    console.log('2333');
}
are();


const s1 = new Set();
let  val = '234556';
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
console.log(typeof Array.prototype.includes === 'function')
const ar3 = [1,2,3,5];
console.log(ar3.entries())