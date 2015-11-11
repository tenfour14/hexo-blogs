title: 前端课件1-入门篇
date: 2015-11-11 08:48:05
tags: 前端课件
categories: [前端课件,入门篇]
keywords: 前端课件,入门,HTML,CSS,JS
---

## 前端概述

### WEB1.0到WEB2.0前端的演变:
 美工,切片->网页制作,页面仔->web前端,前端工程师

### 前端做什么的?
 切片,WEB布局,美工,浏览器兼容,用户交互以及体验,当然,这只是初级...
(网页制作,自动构建,性能优化,WEB安全,移动终端等)
### 前端技术,知识体系:
 结构(HTML)+表现(CSS)+行为(JS),说简单点,就是做网页的基本技术,当然,这也是初级,
 <!--more-->

 ![前端知识体系](http://7xj45h.com1.z0.glb.clouddn.com/blogweb.jpg)


## HTML(超文本标记语言)

### 文档声明
 ```html
 <!DOCTYPE html>
 ```
 [其他声明](http://www.w3school.com.cn/html/html_doctype.asp)

### 标签/元素/节点
 ```html
 <a href="http://www.baidu.com"></a>
 标签名  属性  属性值
 ```
 [标签列表](http://www.w3school.com.cn/tags/index.asp)
 PS1: 常用标签: `h1-h6`,`a`,`p`,`ul`,`ol`,`li`,`table`,`tr`,`td`,`span`,`div`(排序不分先后)
 PS2: 常用属性: `class`,`id`,(`style`)
### W3C标准/规范
 0. 标签必须闭合,
 1. 标签,属性全部小写,
 2. 属性值双引号,
 3. 属性必须有属性值,
 4. 自定义属性data开头下划线连接等

### 快级,行内元素
  block,inline,inline-block

## CSS(层叠样式表)

### 语法格式
 ```css
 选择器 {属性: 值;属性: 值;}
 ```

### 选择器
 0. 通配选择器
   ```
     * {font-size: 12px;}
   ```
 1. 元素/标签选择器
   ```
     p {padding: 0;margin: 0;}
     a {text-decoration: none;}
   ```
 2. 类选择器
   ```
     .header {height: 100px;width: 200px;}
   ```
 3. ID选择器
   ```
     #footer {background: red;}
   ```
 4. 子选择器
   ```
     div a {background: blue;}
     div > a {background: yellow;}
   ```
 5. [更多选择器](http://www.w3school.com.cn/cssref/css_selectors.asp)

### 优先级
  直接>ID>类>元素
 1000 100 10 1
 PS: 优先级相同,后面覆盖前面的

### 引入方式 
  1. 外链 (通过link引入外部`.css`扩展名文件) **[推荐]**
  2. 直接 (直接标签的`style`属性上面)
  3. 内嵌 (直接写在`head`中的`style`内部)




