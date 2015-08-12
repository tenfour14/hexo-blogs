title: JS 如何获取一个数据的数据类型
date: 2015-08-12 13:54:31
tags: [js,数据类型]
categories: [javascript,数据类型]
keywords: javascript,js,数据类型,constructor,instanceof,typeof
---

我们都知道,在`js`中,数据类型有:`String`,`Number`,`Boolean`,`Undefined`,`Object`,`Array`,`Function`,`Null`等,当然,其中`Array`,`Function`,`Null`都是属于`Object`的.也就是说,我们要如何区分`String`,`Number`,`Boolean`,`Undefined`,`Object`甚至于区分`Object`中的`Array`,`Function`,`Null`,`Date`,`RegExp`等.

<!--more-->
## 1. typeof
我们先来看以下最常用的`typeof`:
```js
var num = 123;
var str = 'abc';
var obj = {a: 1,b: 2};
var fun = function(){};
var bool = true;
var reg = /123/;
var und = undefined;

console.log(typeof num);  // number
console.log(typeof str);  // string
console.log(typeof bool); // boolean
console.log(typeof obj);  // object
console.log(typeof fun);  // function
console.log(typeof reg);  // object
console.log(typeof und);  // undefined
```
上面这些情况,`typeof`都能正确的简单区分`String`,`Number`,`Boolean`,`Undefined`,`Object`以及一个特殊的`Object------Function`,但是,如果数据是我们通过`new`关键字生成的数据,就不一样了:
```js
var num = new Number(123);
var str = new String('123');
var obj = new Object({a: 1,b: 2});
var bool = new Boolean(true);
var fun = new Function('alert(1)');

console.log(typeof num);  // object
console.log(typeof str);  // object
console.log(typeof obj);  // object
console.log(typeof bool); // object

console.log(typeof fun);  // function
```
可以看到,除了`function`所有的结果都是`object`,当然,上面本身结果都是`Object`的数据(数组,正则等)就不再做重复验证.

## 2. instanceof
`instanceof`和`typeof`有所不同,它不能直接返回数据类型,`instanceof`是一个**双目运算符**,用来判断一个数据是否为一个对象的实例,返回布尔类型结果.

```js
var num = new Number(123);
var str = new String('123');
var obj = new Object({a: 1,b: 2});
var bool = new Boolean(true);
var fun = new Function('alert(1)');
var reg = new RegExp('a');

console.log(num instanceof Number); // true
console.log(str instanceof String); // true
console.log(obj instanceof Object); // true
console.log(bool instanceof Boolean); // true
console.log(fun instanceof Function); // true
console.log(reg instanceof RegExp); // true
```
这样都是ok的,但是会出现下面几种问题:
1.由于所有的对象都是继承`Object`,所以上面的数据都可以看成是`Object`实例化而得到的,那么在进行和`Object`的`instanceof`运算的时候都为`true`:

```js
console.log(num instanceof Object); // true
console.log(str instanceof Object); // true
console.log(obj instanceof Object); // true
console.log(bool instanceof Object); // true
console.log(fun instanceof Object); // true
console.log(reg instanceof Object); // true
```
2.最原始的声明方式由于不是通过实例化声明的,会运算结果为`false`:

```js
console.log('123' instanceof String); // false
console.log(123 instanceof Number); // false
```
3.`null`和`undefined`无法正常判断:

```js
console.log(null instanceof Object); // false
console.log(undefined instanceof Object); // false
// 不要妄想取试undefined instanceof Undefined
// Undefined 在js中根本没这个对象
```

## 3. Constructor
构造函数,可以通过`constructor.name`获取数据的构造函数名称来判断:

```js
console.log((123).constructor.name); //Number
console.log(new Number(123).constructor.name); // Number

console.log('123'.constructor.name); // String
console.log(new String('123').constructor.name); // String

// ...
```
这个几乎能完成所有数据的判断,但是,对于`null`和`undefined`两个异类同样无力.

## 4. 总结
综上,要完美的取判断一个数据的数据类型,可以这样写:

```js
function getType(obj) {
  if( obj === null ) {
    return 'object';
  } else if( obj === undefined ) {
    return 'undefined';
  } else {
    return obj.constructor.name.toLowerCase();
  }
}

getType(null); // object
getType(undefined); // undefined
getType(123); // number
getType(new String('ab')); // string
```
