---
title: 样式冗余
---

# 样式冗余

## 调试时

调试时如果你审查元素样式发现有多个重复样式是正常的，因为不同组件可能引用了同样的less源码，而调试时是直接把不同组件样式用`<style>`标签插入页面。

## 打包时

确保在`vux-loader`里使用`duplicate-style`插件来实现对构建css进行冗余压缩。

## 异步路由的样式

一般情况下，打包后异步路由的样式会使用 js 的方式插入到页面，有时候这并不是我们所要的。可以通过配置 `ExtractTextPlugin` 插件的 `allChunks` 实现样式抽离。

``` js
new ExtractTextPlugin({
  filename: utils.assetsPath('css/[name].[contenthash].css'),
  allChunks: true
})
```