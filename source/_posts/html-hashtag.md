title: HTML你用hash(#!)值弥补ajax局部刷新加载的不足
date: 2015-08-08 15:02:33
tags: [html,hash,ajax]
categories: [html/html5,url]
keywords: html,hash,ajax,#!,url,局部刷新,书签,历史记录
---

自`ajax`的崛起，`web`页面大部分数据的更新都只是进行局部的数据刷新而不再是以前那种整个页面的刷新，尤其是在移动端,大多数`web`页面都采用单页面利用`ajax`减少对服务器的请求.但是这产生了一个缺陷，那就是`ajax`局部刷新浏览器不会产生历史记录，用户无法进行前进后退访问历史记录，同样，用户也无法存储书签，因为url地址完全没变，存下来的书签只是网页首页，里面的数据不会跟着刷新的。还有一点就是,不便于进行`SEO`.

在进入主题之前我们想来了解一下`html`中的地址对象------`location`.
<!--more-->

## href------url

一个网页总有一个地址，也就是`url`链接，利用`location`对象的`href`属性可以得到或者修改这个地址。

得到浏览器中地址栏完整的字符串:
``` js
console.log(location.href);
```

当然,你也可以修改这个值来达到网页的重定向:
``` js
location.href = 'blog.tenfour.cn';
```

## search------参数

经常我们会看到一个地址后面跟着一个?后面还有一长串东西,如下:
```
blog.tenfour.cn?name=tenfou&age=100&sex=M
```
这个玩意有几个用处:

1. 页面传递给后台的参数
2. 页面传递给另一个页面的参数
3. 版本控制或者避免浏览器缓存

具体与本章无关,就不多说.

## hash------锚点
在本页面不同点跳转:
```html
// 页面顶部预设一个锚点,浏览器差异,最好把id和name都设置一样的值
<a name="top" id="top"></a>
//...省略N行代码
<a href="#top">点击返回顶部</a>
```
当然,不同页面也可以跳转:
``` html
// download.html 下载页面

// ... 前面省略N行广告代码
<a name="download" id="download"></a>
<a href="aa">南方电信</a>
<a href="bb">北方网通</a>

// 另外一个页面
<a href="download.html#download">点击前往下载</a>
```
#后面的值就叫`hash`值,可以通过`location.hash`获取或者改变.

试过上面几个例子的或许会发现，只要当地址改变，无论是页面(href)、参数(search)、锚点(hash)改变，浏览器都会产生记录。我们可以利用这这个来实现ajax局部刷新让浏览器生成历史记录。局部刷新也就是说页面不会刷新，地址改变或者参数改变都会刷新页面，所以我们只有利用锚点(hash)来实现。
锚点跳转不会刷新页面,但是会产生浏览器记录,我们可以你用这点来解决前面提到的浏览器ajax局部刷新无浏览器记录的缺陷.

## window.onhashchange
高版本的浏览器有一个事件`window.onhashchange`可以监听浏览器当前页面的`hash`值,当`hash`值改变的时候会执行该事件函数.

```html
<a href="#hash1">hash1</a>
<a href="#hash2">hash2</a>
<a href="#hash3">hash3</a>
<script>
  window.onhashchange = function(){
    alert(location.hash);
  }
</script>
//可以发现每次点击一个hash都改变了，都执行了hashchange函数的。

```

下面我们就来模拟一个ajax局部刷新产生浏览器记录的方法：点击导航，局部刷新content类容，并且产生浏览器历史记录:
``` html
<ul class="nav">
  <li>
    <a href="#home">首页</a>
    <a href="#contat">联系我们</a>
    <a href="#about">关于我们</a>
  </li>
</ul>

<div class="content">
  <!-- 内容区域 -->
</div>
<script>
//点击主页的局部刷新
function loadHome(){
  $('.content').html('主页内容');
}

//点击主页的局部刷新
function loadContact(){
  $('.content').html('联系我们内容');
}

//点击主页的局部刷新
function loadAbout(){
  $('.content').html('关于我们内容');
}

window.onhashchange = function(){
  switch(location.hash){
    case '#home' : loadHome(); break;
    case '#contat' : loadContact(); break;
    case '#about' : loadAbout(); break;
  }
}
</script>
```
OK，这样就可以产生浏览器历史记录了，可以试试，但是还有一点没有解决，那就是书签，你直接复制一个输入到地址栏回车，还是首页，这事因为首次输入并没有触发onhashchange事件，所以我们还要加一段话：
``` js
switch(location.hash){
  case '#home' : loadHome(); break;
  case '#contat' : loadContact(); break;
  case '#about' : loadAbout(); break;
}
```
这样页面一加载就会执行一次。所以存储书签也能实现了.

## url中的#!

既然锚点`(#hash)`能解决，那#!又是什么呢？
要理解这个就要熟悉`seo`，搜索引擎优化，对于锚点改变的连接对于搜索引擎来说，只是一个连接.例如：`tenfour.cn#nodejs和tenfour.cn#express`对于搜索引擎来说，会忽略掉后面的`hash`值，只会记录`tenfour.cn`一条记录。前不久，谷歌等部分浏览器产生了一条新的“潜规则”，对于#!这类的hash值不会被忽略掉，搜索引擎会进行抓取并生成记录。所以一般我们ajax局部刷新的hash会写成:
``` html
<ul class="nav">  
  <li>
    <a href="#!/home">首页</a>
    <a href="#!/contat">联系我们</a>
    <a href="#!/about">关于我们</a>
  </li>
</ul>
<!-- 当然，js处理判断里面也要把这个加进去，location.hash获取的是#后面的所有类容(包括#) -->
```

## 兼容性处理
对于低版本不支持`onhashchange`的浏览器可以用计时器无限刷新判断或利用`iframe`,`location.hash`这个是所有浏览器都支持的(包括IE6)，所以只需要解决`onhashchange`的兼容就ok了，这个解决方法自己研究，我要LOL去了。