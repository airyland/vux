---
title: 关于 VUX
---

<p align="center">
  <br>
   <a href="https://vux.li/demos/v2?x-page=v2-doc-home">
    <img src="https://ws1.sinaimg.cn/large/663d3650gy1fq670tkjoij207s07sq2p.jpg" width="100" alt="">
  </a>
  <br>
  <a href="https://vux.li/demos/v2?x-page=v2-doc-home">
    预览地址>>
  </a>
  <br>
  <br>
  <a href="https://github.com/airyland/vux">
    <img src="https://img.shields.io/github/stars/airyland/vux.svg?style=social&label=Star" alt="">
  </a>
  <a href="https://github.com/airyland/vux">
    <img src="https://img.shields.io/github/forks/airyland/vux.svg?style=social&label=Fork" alt="">
  </a>
  <a href="https://github.com/airyland/vux">
    <img src="https://img.shields.io/github/watchers/airyland/vux.svg?style=social&label=Watch" alt="">
  </a>
  <br>
  <br>
  <a href="https://github.com/airyland/vux/issues">
    <img src="https://img.shields.io/github/issues/airyland/vux.svg?style=flat-square" alt="">
  </a>
  <a href="https://github.com/airyland/vux/issues">
    <img src="https://isitmaintained.com/badge/resolution/airyland/vux.svg?style=flat-square" alt="">
  </a>
  <a href="https://github.com/airyland/vux/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/airyland/vux.svg?style=flat-square" alt="">
  </a>
  <br>
  <a href="https://www.npmjs.com/package/vux">
    <img src="https://img.shields.io/npm/l/vux.svg?style=flat-square" alt="">
  </a>
  <a href="https://www.npmjs.com/package/vux">
    <img src="https://img.shields.io/npm/v/vux.svg?style=flat-square" alt="">
  </a>
  <a href="https://www.npmjs.com/package/vux">
    <img src="https://img.shields.io/npm/dm/vux.svg?style=flat-square" alt="">
  </a>
  <a href="https://www.npmjs.com/package/vux">
    <img src="https://img.shields.io/npm/dt/vux.svg?style=flat-square" alt="">
  </a>
  <br>
  <br>
</p>

::: warning
  **敲黑板**：VUX 必须配合 `vux-loader` 使用，如果不使用 vux2 模板请按照<router-link to="/zh-CN/install/manual-usage.html">文档</router-link>正确配置。<br>

  **less@3.x** 有严重的兼容问题，请暂时使用 **less@^2.7.3**。
:::

## 简介

`VUX`（读音 [v'ju:z]，同 `views`）是基于`WeUI`和`Vue`(2.x)开发的移动端UI组件库，主要服务于微信页面。

基于`webpack + vue-loader + vux`可以快速开发移动端页面，配合`vux-loader`方便你在`WeUI`的基础上定制需要的样式。

`vux-loader`保证了组件按需使用，因此不用担心最终打包了整个vux的组件库代码。

`VUX`并不完全依赖于`WeUI`，`VUX` 在 `WeUI` 的基础上扩展了多个常用组件，但是尽量保持整体UI样式接近`WeUI`的设计规范。

::: warning
VUX 并不是一个能解决所有场景的完美解决方案(实际上也没有一个方案能解决所有问题)，也会出现某些`bug`或者某些特性不支持，所以如果遇到问题麻烦及时**不带情绪正确反馈**，**我们乐于及时解决描述详细方便重现的问题**。<br>
即使你不直接使用 `VUX` 组件代码, 你依然可以参考 VUX 代码来实现自己的组件库。如果一定程度上帮助到了你，那么维护这个项目也就有所意义。
:::

## 订阅版本发布通知

请使用微信扫描

<img src="https://ws1.sinaimg.cn/large/663d3650gy1fpno3msj6wj20dw0dw748.jpg" width="150">

## 提示
::: tip
`VUX` 是`库`而非`框架`，虽然有专用的 `vux-loader`，但并不影响你自由地使用其他组件库或者工具库。<br><br>

`VUX` 使用的 CSS 预处理工具是 `less`(同 WeUI)，但(利益于 .vue 单文件组件的灵活性)这并不影响你使用 `SASS` 等其他预处理器。<br><br>

用以表示该组件库时请使用大写名字 `VUX`，用在说明版本号时使用小写 `vux@2.x`。
:::
