---
title: vux-loader 实现方式
---

# vux-loader 实现方式

说明一下`vux-loader`是如何和`vue-loader`<del>搞基</del>配合的。

如果你看过`webpack`loader的介绍，理论上说如果需要自己手动先处理代码再传入`vue-loader`,你只需要这样对loader做配置: `vue-loader!my-loader`。但是如果你试过，就知道这个目前行不通。`vue-loader`不会接收上一个loader的source进行处理，因为.vue文件的特殊性，它直接生成了loader string进入下一个处理，处理后的结果大概是这样的：

``` js
/* styles */
require("!!vue-style-loader!css-loader!vue-loader/lib/style-rewriter?id=data-v-20d7ba9a!vue-loader/lib/selector?type=styles&index=0!./index.vue")

/* script */
__vue_exports__ = require("!!babel-loader!vue-loader/lib/selector?type=script&index=0!./index.vue")

/* template */
var __vue_template__ = require("!!vue-loader/lib/template-compiler?id=data-v-20d7ba9a!vue-loader/lib/selector?type=template&index=0!./index.vue")
```

那么vue-loader提供了自定义loader string的选项，直接配置可否呢，[#531](https://github.com/vuejs/vue-loader/issues/531)，直接配置会破坏原来的loader参数，导致不能Live reload。

那么最终能想到的就是直接修改`vue-loader`生成的代码，这样既不会影响`vue-loader`原来的逻辑，也能自由控制。

最终实现方式是前置`vux-loader`即：`vux-loader!vue-loader`，vux-loader将vue-loader生成的代码二次处理，分割loader string并(强行)插入vux的 template-loader, style-loader, script-loader，那么你就能理解vux-loader的配置方式了，在3大基本loader里获取到vux-loader的插件配置列表逐个做处理就行了。

上面的代码强行处理后是这样的：

``` js
/* styles */
require("!!vue-style-loader!css-loader!vue-loader/lib/style-rewriter?id=data-v-20d7ba9a!./../../../../vux-loader/src/style-loader.js!vue-loader/lib/selector?type=styles&index=0!./index.vue")

/* script */
__vue_exports__ = require("!!babel-loader!vue-loader/lib/selector?type=script&index=0!./../../../../vux-loader/src/script-loader.js!./index.vue")

/* template */
var __vue_template__ = require("!!vue-loader/lib/template-compiler?id=data-v-20d7ba9a!./../../../../vux-loader/src/template-loader.js!vue-loader/lib/selector?type=template&index=0!./index.vue")
```

原理就是这么简单（但是处理时还是遇到一些问题），为了方便使用，编写了常用的一些插件。

至于`js-parser`就只是在`babel-loader`前加上了`vux-loader`的`js-loader`。

而所有的loader, plugins设置都是在`vux-loader`的`merge`方法里来完成。