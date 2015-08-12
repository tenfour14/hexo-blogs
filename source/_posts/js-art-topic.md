title: JS一些艺术性答案的面试题
date: 2015-08-12 19:20:41
tags: [js,js的艺术,面试题]
categories: [javascript,JS的艺术]
keywords: javascript,js,艺术,面试题,答案
---

在很多`js`程序中,很多功能或者逻辑只要求实现都是很简单的,但是要达到一个"艺术化"的代码形式,那才更有挑战.

代码,只有我们能看,用户看到的只是结果,搞那么完美有啥意义?只要达到目的不就ok了?NO~!,提升代码的质量同时也是对自己能力的提升,也就代表着薪资.当然,还有一些其他我们不关注的(毕竟我们关注的只有钱),如:性能的提升,装逼等.那怎样的代码才叫有"艺术"呢?

前面我们写到的一篇文章,[JS位运算的巧妙运用](/2015/08/10/js-bit-operation/)等.同样,下面再来看几个例子:

<!--more-->

## 1. 获取某一天是星期几

二逼程序员写法:
```js
function getWeek(date){
  var week = new Date(date).getDay();
  if( week == 0 ){
    return '星期天';
  }else if( week == 1 ){
    return '星期一';
  }else if( week == 2 ){
    return '星期二';
  }
  // ... 省略这些无聊的代码了
}
```
普通程序员写法:
```js
function getWeek(date){
  var week = new Date(date).getDay();
  switch( week ){
    case 0: return '星期天';
    case 1: return '星期一';
    case 2: return '星期三';
    // ... 省略N字
  }
}
```
文艺程序员写法:
```js
function getWeek(date){
  return '星期' + ['天','一','二','三','四','五','六'][new Date(date).getDay()];
  // 或者这样:
  // return '星期' + '天一二三四五六'.charAt(new Date(date).getDay());
}
```
这就是艺术,巧妙运用数组或者字符串的`charAt`来避免条件分支的选择(`if...else`或者`switch...case`).继续往下看.

## 2. 两个非Number类型数据的交换

前面文章 [JS位运算的巧妙运用#两个整数的互换](/2015/08/10/js-bit-operation/#change-number) 已经提到过可以通过加减或者位运算的按位异或(^)来交换两个Number类型的数据.但是对于其他数据类型呢?

```js
var a = [1,2,3];
var b = {a: 1,b: 2};
a = [b,b = a][0];
```
同样利用数组,简简单单的一句话交换两个复杂数据类型,避免了创建中间变量,当然这个也相当于创建了中间变量------一个数组,不过代码上却简洁了许多.

## 3. 闰年的判断

二逼程序员写法:
```js
function isLeapYear(y){
  if( y%400 == 0 ){
    return true;
  }else if( y%4 == 0 && y%100 != 0 ){
    return true;
  }else {
    return false;
  }
} 
```

普通程序员写法:
```js
function isLeapYear(y){
  return y%400 == 0 || ( y%4 == 0 && y%100 != 0 );
}
```

文艺程序员写法:
```js
function isLeapYear(y){
  return new Date( y , 1, 29 ).getDate() == 29;
}
```
先解释下这段代码,在js中,采用`new Date()`实例化一个时间对象的时候,只要年月日数据类型正常,不管传入的时间是否合理,比如传入1991年2月29(当然,平年2月是没有29的,所以数据不合理,**但是注意一点,这个月份需要减去1,Date中月份是从0开始到11结束**),系统会默认往后面移一天,也就是`new Date(1991,1,29)`得到的结果是1991年3月1号,但是如果传入的是2000年2月29,闰年是有这一天的,那`new Date(2000,1,29)`得到的结果就是2000年2月29,所以我们只需要再获取结果的日期是否是29来判断是否为闰年.

## 4. 合并一个数组到另外一个数组上面

二逼程序员写法:
```js
var a = [1,2,3];
var b = [4,5,6];
for( var i = 0; i < b.length; i++ ){
  a[a.length] = b[i];
  // 或许牛逼一点的二逼还会这样写
  // a.push(b[i]);
}
```

普通程序员写法:
```js
var a = [1,2,3];
var b = [4,5,6];
a = a.concat(b);
```
这种写法有什么不好呢?注意原题,我们是合并一个数组到另外一个数组上面,`concat`会新创建一个数组,这样会多消耗一些不必要的内存.最后我们还是要把结果重新赋值到变量a上.

文艺程序员写法:
```js
var a = [1,2,3];
var b = [4,5,6];
[].push.apply(a,b);
```

需要解释么?还是解释以下吧,首先我们要了解一下`apply`,这玩意是"函数对象"的一个方法,然后可以跟两个参数,第一个参数是拿来调用这个函数的,第二个参数这个函数运行需要的参数,然后...就这样完成咯.

## 5. 创建一个长度为n的数组,其每个值都为'a'

大部分程序员写法:
```js
function createArr(n) {
  var a = [];
  for( var i = 0; i < n;i++ ){
    a.push('a');
  }
  return a;
}
```

文艺程序员写法:
```js
function createArr(n) {
  return new Array(n+1).join('a').split('');
}
```
至于原因么,大家取`new Array(n)`看一下结果就知道咯.然后就是你用`join`和`split`来解决.