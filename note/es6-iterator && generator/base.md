###生成器与迭代器
---
#####什么是迭代器？
  迭代器是一种特殊对象。<br/>

**特点:**  

- 每个对象都有一个next方法
- 每次next()方法返回一个对象，包含value和done属性，表示 当前返回值 和 是否完成遍历。

##### 用es5写个迭代器
```
    function iterator(arr) {
        let index = 0;
        const {length} = arr;
        return {
            next() {
                if(index < length) {
                    return { value: arr[index++], done: false };
                } else {
                    return { value: undefined, done: true };
                }
            }
        }
    }

    const array = iterator([1,2,3,5]);
    console.log(array.next()); // { value: 1, done: false }
    console.log(array.next()); // { value: 2, done: false }
    console.log(array.next()); // { value: 3, done: false }
    console.log(array.next()); // { value: 5, done: false }
    console.log(array.next()); // { value: undefined, done: true }
```
正好符合上面我们说的特点。

##### 那生成器是什么？
   以**function *foo()** {} 或者  **\*function foo(){}**    这种形式就是<b>生成器</b>，函数体里面有 <b>yield</b> 关键字。
#####先看个例子：
```
   function *foo() {
       yield 1;
       yield 2;
       yield 3; 
   }
   const iterator = foo(); // 迭代器对象
   console.log(iterator.next()); // { value : 10,  done : false }
   console.log(iterator.next()); // { value : 10,  done : false }
   console.log(iterator.next()); // { value : 10,  done : false }
   console.log(iterator.next()); // { value : undefined,  done : true }
```

yield实际上充当一个**接收**和**返回**的作用  
简单来说就是 yield是**暂停**, next是**开始**  <br/>
#####再看一个例子

```
   function *foo(x) {
     const y = yield(x*2);
     const z = yield(y/2);
     return x+y+z;
   }
   const iterator = foo(2);
   console.log(iterator.next());  // { value: 4, done: false } 返回 yield(2*2) = 4;
   console.log(iterator.next(8)); // { value: 4, done: false } set yield(x*2) = 8, 即 y = 8, 返回 yield(8/2);
   console.log(iterator.next(12)) // { value: 22, done: true } set yield(y/2) = 12, 即 z = 12,返回 x+y+z;
```

#####next特点:  
- 第一次执行，遇到第一个yield停止，返回yield后面的值。
- 第二次及其后面执行，从上一个yield开始，遇到下一个yield暂停，并返回yield后面的值。