---
title: vux-loader 介绍
---


# vux-loader 介绍

<p align="left">
  <a href="https://www.npmjs.com/package/vux-loader">
    <img src="https://img.shields.io/npm/v/vux-loader.svg?style=flat-square" alt="">
  </a>
  <a href="https://www.npmjs.com/package/vux-loader">
    <img src="https://img.shields.io/npm/dm/vux-loader.svg?style=flat-square" alt="">
  </a>
</p>

`vux-loader`工具的作用是对`.vue`代码进行预处理，不限于 vux 组件库。

它是针对`webpack+vue-loader`项目的工程化工具，简化了webpack插件和loader的使用和编写，支持在vue-loader处理之前进行预处理，同时内置对vux组件专用的配置和优化插件。

当然除了.vue文件外，你还可以对js文件进行预处理。说好的处理.vue文件，为什么连`js`文件也不放过呢？因为只有处理js才能实现理想工程化。举个例子，如果用户需要在`main.js`中调用vux的plugin，他需要这样做：

``` js
import AlertPlugin from 'vux/src/plugins/Alert'
import ToastPlugin from 'vux/src/plugins/Toast'
```
虽然路径不长，但是看着相当不和谐，为了简化这个操作vux提供了更简洁的写法：

``` js
import { AlertPlugin, ToastPlugin } from 'vux'
```

这个操作即是通过`js-parser`插件解析main.js里的`import`语法来实现的，最终进入`babel`处理的代码和上面单独引入一致。

这个工具也许会帮你进一步打开`Vue`项目工程化的思路。

::: tip
作为通用工具，即使你没有使用 `VUX`，依然可以使用它来进行各种代码处理。
:::

## 为什么不使用 babel-plugin-import

* VUX 希望使用源码分发
* VUX 希望无侵入地解决一系列的工程问题，不需要用户手动配置 webpack
* VUX 希望能统计(匿名)使用情况

而上面这些单纯使用 `babel-plugin-import` 无法做到，所以造了个轮子。
