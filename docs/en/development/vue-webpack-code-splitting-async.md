---
title: Vue 异步加载组件
---

# 异步加载组件

将所有页面组件一次性加载是一个很浪费资源和考验用户耐心的做法，尤其在移动端。

## 使用方法

`webpack` 提供了[code splitting](https://webpack.js.org/guides/code-splitting-require/)，你可以按照下面写法实现当切换到特定路由时才加载代码。


需要注意的是 `vue-loader@13.0.0` 语法有所变更，具体参照发布说明 [v13.0.0](https://github.com/vuejs/vue-loader/releases/tag/v13.0.0)

``` js
// vue-loader@13.0.0 之前
const Foo = () => import('./Foo.vue') // 在 Vue 2.4 + vue-router 2.7 版本下可以正确运行

// vue-loader@13.0.0
const Foo = () => import('./Foo.vue').then(m => m.default)
```


## 组件打包问题

如果你在不同的进行了代码分割的 .vue 文件引入了相同的组件，在打包时两个路由的代码都会重复打包该组件。

你可以对重复使用的组件在 `main.js` 进行全局注册，以减少相应 chunk file 的大小并提高下载速度。
