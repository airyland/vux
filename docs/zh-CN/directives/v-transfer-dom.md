---
title: v-transfer-dom 指令
---

# v-transfer-dom 指令

在移动端应用里，为了便于代码组织，通常我们要将组件放在各个路由的 `.vue` 文件里，但是因为此时组件并不在 `body` 下，加上定位，overflowscrolling 设置等原因，会出现遮罩在弹层之上，z-index 失效等问题。

因此我们推荐在纯弹窗类组件比如 `Alert` `Popup` `XDialog` 等组件上使用 `v-transfer-dom` 实现自动移动到 body 下，解决以上问题。

::: warning
必须有一个 `div` 作为占位元素否则会出错
:::


## 使用

### 注册局部指令

``` js
import { TransferDom } from 'vux'

export default {
  directives: {
    TransferDom
  }
}
```

### 注册全局指令

``` js
import { TransferDom } from 'vux'

Vue.directive('transfer-dom', TransferDom)
```

### 模板使用

``` html
<div v-transfer-dom>
  <popup v-model="show"></popup>
<div>
```