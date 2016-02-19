title: 一些很少用但是很好用的方法
date: 2016-02-19 10:15:43
tags: [js,js的艺术,面试题,方法]
categories: [javascript,JS的艺术]
keywords: js,js的艺术,面试题,方法,javascript,JS的艺术
---

`ECMASCRIPT3`,`ECMASCRIPT5`,`ECMASCRIPT6`都有很好的研究过？

又曾发现有那么多好用的方法但是我们在工作中都没有用过？

`underscore`或许都有曾用过，但是，JS自身都提供了很多类似的方法又有谁知道？

<!--more-->

## 1. `String.fromCharCode`

我们都知道`String.charCodeAt`可以取得一个支付的`ASCII`编码，但是我们知道一个`ASCII`编码怎么转化成一个字符串？
```js
'a'.charCodeAt()    // return 97;
'abc'.charCodeAt(1) // return 98

String.fromCharCode(97) // return 'a';
String.fromCharCode(98) // return 'b';
```

**注意：`charCodeAt`是字符串的方法，`fromCharCode`是`String`对象的方法**

## 2. 进制转换
### 1. 十进制转化为其他进制---toString
```js
// 转化为16进制
(123).toString(16)  // return '7b';

// 转化为8进制
(123).toString(8)   // return '173';

// 非Number
('123').toString(2) // return '123';
```
**注意：只能是`Number`类型才能进行进制转换，否则默认进行无参数的 `toString` 操作**
### 2. 其他进制转化为十进制---parseInt
```js
// 二进制111转化为十进制
parseInt(111,2)   // return 7;

// 十六进制ff转化为十进制
parseInt('ff',16) // return 255;
```
### 3. 2,8,16进制转为为十进制的另一种方法
都知道二进制以0b开头，八进制以0/0o开头，十六进制以0x开头，那么我们拼接字符串再在前面添加一个+转为数字，而js默认转化的为十进制，例如：
```js
// 二进制
+'0b111'   // return 7;
// 八进制
+'012'     // return 10;
+'0o12'    // return 10;
// 十六进制 
+'0xff'    // return 255;
```

## 3. Array的各种操作
### 1. Array.from -- 构造数组
`Array.from`可以从有数组特性的对象(字符串，arguments，Set，Map等)中构造一个数组，也可以自己通过length和函数构造一个数组。
```js
Array.from('abc') // return ['a','b','c'];

function test(){
	return Array.from(arguments);
}
test(1,2,3,4) // return [1,2,3,4];

Array.from({length: 5},function(val,index){
	return index*index;
}); // return [0,1,4,9,16]
```

### 2. Array.filter -- 过滤数组
过滤出数组中满足条件的一个新的数组。也就是出入函数返回值为true的值构成的数组。
```js
[1,2,3,4].filter( function(val,index){
	return val < 3;
} ); // return [1, 2];
```

### 3. Array.some -- 至少一个满足
数组中有一个满足就返回true，否则返回false
```js
[1,2,3,4].some(function(val,index){
	return val > 3;
}); // return true;

[1,2,3,4].some(function(val,index){
	return val > 4;
});  // return false;
```

### 4. Array.every -- 全部满足
数组中全部满足返回true，有一个不满足就返回false
```js
[1,2,3,4].every(function(val,index){
	return val > 3;
}); // return false;

[1,2,3,4].every(function(val,index){
	return val > 0;
}); // return true;
```

### 5. Array.fill -- 填充
`Array.fill(val,start,end)` 从start位置修改值为val一直到end位置（不包含end位）,start默认0，end默认length***+1***,超出长度默认到末尾;
```js
[1,2,3,4].fill('a');  // return ['a','a','a','a'];
[1,2,3,4].fill('a',2); // return [1, 2, 'a', 'a'];
[1,2,3,4].fill('a',2,3); // return [1,2,'a',4]
[1,2,3,4].fill('a',2,1000); // return [1,2,'a','a']
```

### 6. Array.includes -- 是否包含
当然，String同样也有该方法，以前找一个东西是否再一个数组/字符串中时总是用正则/`indexOf`,但是正则难写，`indexOf`结果不好判断，includes就是检测一个东西是否包含在数组/字符串中。
```js
'abc'.includes('a'); // true;
'abc'.includes('d'); // false;

[1,2,3].includes(1); // true
[1,2,3].includes('1'); // false
```

### 7. Array.reduce -- 累计循环
`Array.reduce(function(prev,cur,index,arr){},fir)`,prev 为上次循环返回值，cur为当前值，index为索引,fir为循环第一次的prev值，如果没有传入，只第一次循环取两个值，prev和cur各一个。
```js
// 求和
[1,2,3,4].reduce( function(p,c){ return p+c; } ) // return 10;
```
