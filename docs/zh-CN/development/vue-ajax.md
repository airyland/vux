---
title: Vue 中使用 ajax
---

# 发送 ajax 请求


:::tip
`AjaxPlugin` 插件依赖于 [axios](https://github.com/mzabriskie/axios)
详细 API 文档请查看：[axios](https://github.com/mzabriskie/axios)
:::

## 版本要求

`AjaxPlugin`在`vux@^2.1.0-rc.20`开始支持


## 引入

`main.js` 入口文件中引入：

``` js
import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)
```

## 兼容性问题

需要注意的是`axios`是基于`Promise`的，因此如果你需要兼容低版本浏览器([caniuse](http://caniuse.com/#feat=promises))，需要引入`polyfill`。

`Polyfill` 推荐使用 [es6-promise](https://github.com/stefanpenner/es6-promise)


``` js
require('es6-promise').polyfill()
```

## 全局使用

``` js
Vue.http.post('/api').then()
```

## 组件中使用

``` js
export default {
  created () {
    this.$http.post('/api').then(({data}) => {
      console.log(data)
    })
  }
}
```
