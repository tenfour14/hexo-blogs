title: js事件委托
date: 2015-08-08 11:28:36
tags: [js,代码优化,事件委托]
categories: [js,代码优化]
keywords: javascript,js,代码优化,事件委托
---

## 什么是事件委托
事件就是指`js`中的`onclick`,`onmouseout`,`onmousemove`,等事件,委托就是自己的事件,让别人去做.也就是说利用`js`的事件冒泡的原理,父级委托自己的子元素来完成事件,那有什么好处呢?

1. 避免循环,提高性能;
2. 可以让后来通过`js`生成同类元素也能具有事先添加的事件功能.

体我们可以来看下面的例子:
<!--more-->
有以下`html`代码片段,添加函数使点击`li`的时候`alert`其中的`html`:

``` html
<ul id="ul">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
```
一般来说都会这样写:

``` js
var oUl = document.getElementById('ul');
var aLi = oUl.getElementsByTagName('li');
for( var i = 0; i < aLi.length; i++ ) {
  aLi[i].onclick = function() {
    //这里用this而不用aLi[i].innerHTML,有兴趣的朋友可以去试一下这种写法会出现什么问题.
    alert(this.innerHTML);
  }
}
```

那事件委托了?我们可以这样写:
``` js
var oUl = document.getElementById("ul");
oUl.onclick = function(ev){
  ev = ev || window.event;

  // 获取点击的事件源
  tar = ev.target || ev.srcElement;
  
  // 判断事件源是否为li元素
  if(tar.nodeName.toUpperCase() == 'LI') {
    alert(tar.innerHTML);
  }
}
```

可以看出来.下面这种事件委托的写法还比传统写法多几行代码,那么这么写有什么好处了?

## 好处一:避免循环,提高性能

可以看出来下面这种写法没用到循环,循环所消耗的性能是众所周知的,尤为是在真正的项目中,一般都不会想例子中这样3,4个元素而已.当然,如果使用`jquery`另当别论,但是同样会存在元素选择的时候的性能问题.具体看后面`jQuery`事件委托.

## 好处二:可以让后来通过`js`生成同类元素也能具有事先添加的事件功能.

把以下代码分别加在上面两段`js`代码后面:

``` js
var oLi = document.createElement('li');
oLi.createTextNode('5');
oUl.appendChild(oLi);
```
该段代码动态创建一个`<li>5</li>`加在最后面,在上面两个事件添加的情况下分别测试,传统循环添加的是不会有该事件的,但是通过事件委托的方式添加事件有该事件,能够`alert(5)`.

## jQuery事件委托添加

方式1: 
```js
// live这个方法在1.8左右以后的版本貌似已经被抛弃了
$('#ul li').live('click',function(){
  alert($(this).html());
});
```

方式2:
``` js
$('#ul').on('click','li',function(){
  alert($(this).html());
});
```