---
title: Vue 应用移除移动端页面点击延迟
---

# 移除移动端页面点击延迟

::: tip
直接使用 `WeUI` 样式并引入 `fastclick` 会导致一些点击问题，VUX 组件内部已经做了相关处理。
:::

## 引入 fastclick

在`main.js`里引用`fastclick`

``` js
const FastClick = require('fastclick')
FastClick.attach(document.body)
// done
```