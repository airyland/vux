---
title: Vue 应用中使用微信 jssdk
---

# Vue 应用中使用微信 jssdk

::: warning
分享接口只有认证公众号才能使用，域名必须备案且在微信后台设置。

先确认已经满足使用`jssdk`的要求再进行开发。
:::

`WechatPlugin` 插件提供了`commonJS`的引入方式，因此你不需要在 `index.html` 引入文件。

## 版本要求

`WechatPlugin`在`vux@^2.1.0-rc.19`开始支持

## 引入

在 `main.js` 中全局引入：

``` js
import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)

console.log(Vue.wechat) // 可以直接访问 wx 对象。
```

## 组件外使用

考虑到你需要在引入插件后调用`config`方法进行配置，你可以通过 `Vue.wechat` 在组件外部访问`wx`对象。 

`jssdk`需要请求签名配置接口，你可以直接使用 VUX 基于 `Axios` 封装的 `AjaxPlugin`。

``` js
import { WechatPlugin, AjaxPlugin } from 'vux'
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)

Vue.http.get('/api', ({data}) => {
  Vue.wechat.config(data.data)
})
```

## 组件中使用

那么之后任何组件中都可以通过 `this.$wechat` 访问到 `wx` 对象。

``` js
export default {
  created () {
    this.$wechat.onMenuShareTimeline({
      title: 'hello VUX'
    })
  }
}
```