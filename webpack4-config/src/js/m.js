console.log('this is m');

// webpackPrefetch待首屏核心代码加载完成后，自动加载c.js,
// 防止按需加载(比如点击按钮加载) 时候，c.js文件太大，导致loading或者空白，
// 所以需要在加载完首屏核心代码后，再去加载这个文件。
import(/* webpackChunkName: "async-c", webpackPrefetch: true */'./c.js').then((c)=> {
    console.log('c is loaded');
});

export default 'm.js';