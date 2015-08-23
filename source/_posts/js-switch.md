title: Switch 巧妙使用
date: 2015-08-22 20:06:32
tags: [js,js的艺术]
categories: [javascript,JS的艺术]
keywords: javascript,js.js的艺术,switch
---

Switch是一个条件控制语句,它通过将控制传递给其体内的一个`case`语句来处理多个选择和枚举。例如：
```js
switch(week){
  case 0: console.log('星期日');break;
  case 1: console.log('星期一');break;
  case 2: console.log('星期二');break;
  case 3: console.log('星期三');break;
  // ...
}
```

<!--more-->

几乎所有编程语言都有switch这个语句,虽说用得很少,但是都知道每个case后面都要加上break中断跳出switch语句.如果case后面没有break,那么会直接继续执行下一个case,直到最后一个case或者遇到break,当然,如果在一个函数中,return同样很中断switch语句,如:
```js
var test = 1;
switch(test){  
  case 1: console.log(1); 
  case 2: console.log(2);
  case 3: console.log(3);
  case 4: console.log(4);
}
// 结果打印: 123

var test1 = 2;
switch(test1){  
  case 1: console.log(1); 
  case 2: console.log(2);
  case 3: console.log(3); break;
  case 4: console.log(4);
}
// 结果打印: 23

function test3(){
  var test3 = 2;
  switch(test3){   
    case 1: console.log(1); 
    case 2: console.log(2);
    case 3: console.log(3); return;
    case 4: console.log(4);
  }
}
test3();
// 结果打印: 23
```
OK,这些都是基础知识,没什么乐趣.接下来我们可以利用switch的不强制跳出switch顺序执行的性质做一些事情:

**题目: 获取今天是今年的第几天?**

分析: 就是用当月之前所有月份的总天数加上今天的号数.当然还有其他方法,后面会说.

```js
var date = new Date();
var nowMonth = date.getMonth()+1;
var nowDay = date.getDate();
var days = 0;

// 通过switch 计算当月之前所有月份的总天数
// 先假设没有平年和闰年之分,2月都算28天.
switch(nowMonth){
  case 1: days + 0; break;
  case 2: days + 31; break;
  case 3: days + 31 + 28; break;
  case 4: days + 31 + 28 + 30; break;
  //...
}

// 如果月份大于2并且是闰年那么加上2月份少加的一天
// isLeapYear()函数自己去写,返回结果true or false,这里就不写了
// 这里还用到一个技巧: Number + Boolean, true和false分别会被转化成1和0
days += isLeapYear();

//最后加上当天号数,days就是今天是当年的第几天.
days += nowDay;
```

这里我们的switch每个case后面都加了break强制跳出switch语句的,但是经过观察,case的语句很有规则的,来看一下下面的代码(这里就只重写switch中的代码了,其他不变):
```js
switch(nowMonth){
  case 12: days += 30; //加11月分的天数30
  case 11: days += 31; //加10月分的天数31
  case 10: days += 30; //加9月分的天数30
  // ...
  case 1: days += 0; //1月之前没有月份,加0
}
```
这里把case倒过来写,取消break,让他自己重头加到尾,比如当月是8号,那么就会从`case 8`一直加到`case 1`.

**这些小技巧,就是代码的艺术,要优化代码,就是从小做起.**当然,这里主要是讲switch才采用这种方式的,如果只是针对这道题,还有很多更优的方式去做.有兴趣的小伙伴可以自己去研究研究.比如:
```js
//方式一
//12个月,数字并不大,可以事先算好存到一个数组
[0,31,61,92,120,...][nowMonth] + isLeapYear() + nowDay;
```
OK,这样一句话搞定.
```js
//方式二
//暴力一点的,直接用今天减去今天的1月1号,得到一个毫秒级别的数字转化成天数就OK了
//需要注意的一天1月月份传进去应该是0,获取的今天是带有小时分钟的,最后转化后取整
(new Date() - new Date(nowYear,0,1))/1000/60/60/24>>>0
```
OK,同样一句话,最后的`>>>0`去尾法取整.详细查看:[JS位运算的巧妙运用](/2015/08/10/js-bit-operation/).