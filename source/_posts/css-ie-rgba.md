title: IE rgba兼容问题
date: 2015-08-08 12:06:17
tags: [css,ie,兼容性,rgba,透明度]
categories: [css/css3,兼容性]
keywords: css,ie,兼容性,rgba,透明度
---

`CSS`透明度设置有`opacity`,`IE`有滤镜`filter:alpha()`,那`rgba`也是设置透明度的,有什么用呢?

`opacity`,`IE`的`filter:alpha()`透明度设置会让子元素继承其透明度,但是在实际项目中中,往往更多的是不想要其透明度被继承.当然,这个可以通过用定位而不直接写在透明元素里面解决透明度继承问题,但是定位始终不是一个好的布局方式.

**非`IE`浏览器**可以设计背景色用`rgba(R,G,B,A)`,其中R,G,B分别是0-255数字或者用百分比表示，A是0-1的数字，0表示全透明，1表示正常显示.但是人神共愤的`IE`并不支持这玩意.不过`IE`也有它可爱的一面------滤镜.

<!--more-->

``` css
filter:progid:DXImageTransform.Microsoft.gradient(startcolorstr=#AARRGGBB,endcolorstr=#AARRGGBB)
```
这本身是一个`IE`渐变的滤镜.不过我们把渐变的`startcolorstr`和`endcolorstr`设置为一样的,那就不存在渐变的效果了.其中`RRGGBB`是(0-255)十六进制的RGB值,但是透明度`AA`也是(0-255)十六进制,所以需要转换以下,比如0.5的透明度需要转换为255*0.5取整再转换为十六进制.