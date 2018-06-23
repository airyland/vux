---
title: Vue 全局公用函数
---

# vue 全局公用函数

如果你需要让一个工具函数在每个组件可用，可以把方法挂载到 `Vue.prototype`上。

## 注册

`main.js` 中

``` js
Vue.prototype.$method = function () {}
```

::: tip
一般建议函数名使用 `$` 前缀。像 `vue-router` 的 `$route` 和 `$router`。
:::

## 使用

那么组件代码里

``` js
export default {
  created () {
    this.$method()
  }
}
```

## 说明

挂载到 `prototype` 上是为了方便组件内直接用 `this.$method` 来使用，你也可以直接用 `Vue.method`，这样同样可以全局使用，不过在组件内就需要再 import 一次 `Vue` 了。