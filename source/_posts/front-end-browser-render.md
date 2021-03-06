title: 输入网址到浏览器呈现页面的全过程
date: 2015-08-13 20:28:25
tags: [前端综合]
categories: [前端综合]
keywords: 前端综合,页面呈现,dns,域名解析,DOM树,呈现树,三次握手,HTML解析
---

当你在浏览器地址栏输入一个网址,敲下回车,是个人都知道接下来会发生什么------呈现一个网页,不管是正常显示,还是404,又或者是错误页面,总之就一个效果,显示一个网页出来.当然还有一种2B的行为,没有联网,不过还是会出来一个提示未联网的页面.

那从么从输入一个网址到页面的呈现,会经历哪些过程呢?

作为一个用户,或许没必要去了解这些.不过作为一个程序员,尤其是WEB程序员,这其中的点点滴滴就必须要去深究了.深入的去研究这些一方面可以让你在做性能优化的时候有更多的方面去考虑,另一方面这个也是面试经常会问到的问题.

<!--more-->

## 1. DNS------域名解析

大千世界,人有千千万,唯一能识别一个人的标识就是身份证号码,他住哪?那就只有通过一个完整的地址能找到了.
互联网中,计算机同样千千万,唯一能识别一台计算机的就是MAC地址.它在哪?IP所标识的就是它的地址所在.

当你输入一个网址,浏览器首先会通过域名解析系统(DNS)解析成一个IP地址,这样才能确定我们需要请求的资源在哪里.当然,DNS解析的过程也是相当复杂的,或浏览器缓存(已经被解析过一次的,浏览器会有一段时间的缓存这个网址对应的IP地址),或者读取系统文件(系统缓存,host文件等),或者路由器缓存,或者真正的去解析了(递归搜索,域名都是顶级,二级,三级....等,浏览器会递归的去搜索到顶级域名,再开始解析成IP地址)...

这个问题这里就不多说,总之一句话: 首先浏览器会把域名(也就是上面说到的网址)解析成一个IP地址.

## 2. 建立连接------三次握手

通过DNS解析已经得到我们需要的资源在哪里了,那么浏览器就可以通过TCP/IP协议向这个地址发送请求了.但是还需要三次握手才能确认可以通信.

首先浏览器和服务器建立连接:

**第一次握手**: 建立连接时，客户端发送syn(同步序列编号)包（syn=j）到服务器，并进入SYN_SENT状态，等待服务器确认;
**第二次握手**: 服务器收到syn包，必须确认客户的SYN（ack=j+1），同时自己也发送一个SYN包（syn=k），即SYN+ACK包，此时服务器进入SYN_RECV状态；
**第三次握手**: 客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK(ack=k+1），此包发送完毕，客户端和服务器进入ESTABLISHED（TCP连接成功）状态，完成三次握手。

就好比A和B要打电话要确认双方手机都没问题都能听到那么必须要三次对话:

A: 能听到我说话么?
B: 能听到,你能听到我说话么?
A: 我也能听到.

OK,这样才能确定双方都能收到并且都知道对方能收到.当然,这其中的复杂度我们这里也不去深究.

## 3. 发送请求

在确认浏览器能和服务器通信后,浏览器就需要向服务器发送请求,也就是告诉浏览器我需要什么.

## 4. 服务器处理并响应

服务器收到浏览器的请求后在首先会进行一些处理:

- 如果没有浏览器需要的东西就重定向到404页面告诉浏览器: 不好意思,我这里没得你要的东西
- 如果有缓存响应(返回)304等状态码给浏览器说: 你自己有这些东西,在你自己那里找
- 如果处理的时候发生错误了重定向到500错误页告诉浏览器: 老子住院了,你要的东西过两天给你
- 如果处理正常就返回html页面或者把(jsp,php)等动态页面生成html页面返回给浏览器: 你要的东西,拿好滚
- ...等等,总之返回给浏览器一个html页面.

## 5. 页面渲染

### 5.1 解析HTML------DOM树

浏览器在收到返回的html就会开始解析生成DOM树(DOM tree),对于看过数据结构的对树这个名词并不陌生，对编程中树这个名词不熟悉的可以想象成一颗真实的树，树根就是树的根节点，每一个分枝点都算一个节点，一个节点(A)分出一个或者多个节点(A1,A2,A3…)叫子节点，同样，相对于A1,A2…来说A叫父节点。
HTML 中的每一个标签都是树中的一个节点，document就是树的根节点。DOM树包含了HTML所有标签，包括不可见的script等、display:none隐藏的标签等。

### 5.2 解析CSS

同时（相对于不同的浏览器5.1，5.2的顺序不一定是先解析HTML,再解析CSS），浏览器把所有样式（css）解析成结构体，在解析过程中，浏览器会干掉不能识别的样式，比如谷歌会干掉-moz-,-ms-,-o-等，css hach(加_、*、+)区别浏览器的css，另外还有就是写错的(例如width写成widht)等。

### 5.3 DOM树附着CSS------呈现树

完成之后浏览器会结合DOM树和样式结构体构建render tree(渲染树、呈现树)(这个过程chrome官方叫"附着")。render tree和DOM tree的区别在于：

1. render tree能识别样式，每个节点中包含自己的样式。
2. render tree不包含隐藏的节点，display:none的节点。但是visibility:hidden节点会包含在render tree中，因为它占有空间，会影响页面的布局和渲染。
3. render tree不包含不呈现在页面中，不影响页面渲染的节点。如head这种。

**根据CSS2的标准，render tree中的每个节点都称为Box (Box dimensions)，理解页面元素为一个具有填充、边距、边框和位置的盒子。**

### 5.4 绘制页面

一旦render tree构建完毕后，浏览器就可以根据render tree来绘制页面了。绘制页面浏览器首先会进行一个布局,只绘制元素影响布局的样式(margin,padding,width,height,border等),然后再进行页面颜色等样式的渲染.最后页面就呈现给用户咯.

**PS: 本文只是个人理解,如有错误欢迎留言指正**

