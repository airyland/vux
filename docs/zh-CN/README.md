---
nav: zh-CN
---

<p align="center">
  <br>
   <a href="https://vux.li/demos/v2?x-page=v2-doc-home">
    <img src="https://static.vux.li/demo_v2_doc_home.png" width="100" alt="">
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

<p class="warning">
  如果你遇到 `$t` 报错问题，`请不要开 issue`，升级 `vux-loader >= 1.0.58`。
  <br>
  <br>
  VUX 必须配合 `vux-loader` 使用，如果不使用 vux2 模板请按照下面文档正确配置。
</p>

<p class="tip">
  2.1.0 ~ 3.0.0 之间版本不会有影响升级的 `break change`，请放心及时更新版本。
  <br>
  <br>
  0.x 版本文档不完整，并且已经不再维护。请更新或者直接使用`2.x`。
  <br>
  如果你想查看`0.x`组件代码和 Demo 代码，请查看 [master 分支](https://github.com/airyland/vux/tree/master)
  <br>
  <a href="https://vuxjs.gitbooks.io/vux/content/">访问 `0.x` 文档地址</a>
</p>

## 简介

Vux（读音 [v'ju:z]，同`views`）是基于`WeUI`和`Vue`(2.x)开发的移动端UI组件库，主要服务于微信页面。

基于`webpack`+`vue-loader`+`vux`可以快速开发移动端页面，配合`vux-loader`方便你在`WeUI`的基础上定制需要的样式。

`vux-loader`保证了组件按需使用，因此不用担心最终打包了整个vux的组件库代码。

`vux`并不完全依赖于`WeUI`，但是尽量保持整体UI样式接近`WeUI`的设计规范。最初目标是创建一个`易用`，`实用`，`美观`的移动端UI组件库，现在离理想状态还有不少距离，因此需要大家及时反馈问题及贡献代码。

即使你不使用vux的代码, 但能从源码得到一些参考那么也是件让人高兴的事情。

<p class="warning">
  vux@2.x 推荐`webpack+vue-loader`方式的开发，如果要使用`umd`文件，请参照下面文档。不建议使用引入`script`的方式进行开发，因为它会带来一系列的开发、维护、效率、部署问题。
  <br>
  <br>
  Life is short, use webpack.
</p>

## 使用案例

> 如果你的产品在使用`VUX`, 欢迎邮箱发送`Logo+链接`给我（统一格式：二维码必须无白边框）。

<img src="https://i.loli.net/2018/01/05/5a4f263859763.jpg" width="150">
<img src="https://static.vux.li/showcase/jkda51.png?v2" width="150">
<img src="https://static.vux.li/showcase/voez.png?v2" width="150">
<img src="https://static.vux.li/showcase/xmb.png?v2" width="150">
<img src="https://static.vux.li/showcase/jkny.png" width="150">
<img src="https://static.vux.li/showcase/linkup.jpg" width="150">
<img src="https://static.vux.li/showcase/xingshifu.png" width="150">
<img src="https://static.vux.li/showcase/dsxqian.jpg" width="150">
<img src="https://static.vux.li/showcase/ljwk.jpg" width="150">
<img src="https://static.vux.li/showcase/bianjibang.jpg" width="150">
<img src="https://static.vux.li/showcase/timemgt.jpg" width="150">

## 安装使用(webpack)

<p class="warning">
  如果你从没使用过`VUX`，请直接看下面的快速入门。
</p>

直接安装或者更新：

``` js
npm install vux --save
```

或者使用 `yarn`

``` js
yarn add vux // 安装
yarn upgrade vux // 更新
```

如果你是从`0.x`更新，请参考： <a router-link="/zh-CN/upgrade-to-2" style="color:#42b983;">更新到`2.x`</a>


<p class="warning">
vux2必须配合`vux-loader`使用, 请在`build/webpack.base.conf.js`里参照如下代码进行配置：
</p>

``` js
const vuxLoader = require('vux-loader')
const webpackConfig = originalConfig // 原来的 module.exports 代码赋值给变量 webpackConfig

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui']
})
```

<p class="warning">
vux@0.x 已经停止维护，请尽快迁移到 vue@2.x & vuex@2.x & vux@2.x，虽然要花点时间，但是完全值得。
</p>

### 快速入门

> 使用 `vue-cli` 工具和 `airyland/vux2` 模板快速初始化项目

> 默认为 webpack2 模板，如果你需要使用`webpack1`，请使用 vue init airyland/vux2#webpack1 projectPath

``` bash
npm install vue-cli -g // 如果还没安装
vue init airyland/vux2 projectPath

cd projectPath
npm install --registry=https://registry.npm.taobao.org
npm run dev
```

<p class="warning">

  请特别注意，直接使用 `cnpm` 可能会导致依赖不正确。强烈建议给 npm 设置 taobao 的 registry。
  <br>

  ```
  npm install --registry=https://registry.npm.taobao.org
  ```

  <br>
  <br>

  如果你已经用上了 `yarn`，建议这样
  <br>
  ```
  yarn config set registry https://registry.npm.taobao.org
  ```
  <br>
  ```
  yarn
  ```
</p>

### 调用示例

> .vue文件中调用组件

``` html
<template>
  <div>
    <group>
      <cell title="title" value="value"></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
  }
}
</script>
```

> main.js中调用plugin

``` js
import { AlertPlugin, ToastPlugin } from 'vux'

Vue.use(AlertPlugin)
Vue.use(ToastPlugin)

// 详细使用请参考对应组件文档
```

### 手动使用

折腾能力强的同学参考一下，下面即`vuxjs/vux2`模板主要处理的事项:

<p class="tip">注意的是下面事项并非表示Vux使用繁琐，部分只是出于确保有正确的依赖和配置，而部分是出于优化。</p>

- 引入 `reset.less`，默认样式不包含reset，并且部分用户自己有一套reset样式，因此需要在`App.vue`进行手动引入

  ``` html
  <style lang="less">
  @import '~vux/src/styles/reset.less';
  </style>
  ```

- 配置 vux-loader

  请在`build/webpack.base.conf.js`里参照如下代码进行配置：

  <p class="warning">注意：请把 resolve 里的 symlink 设为 `true` 如果你是使用 cnpm 进行依赖安装 </p>

  ``` js
  const vuxLoader = require('vux-loader')
  const webpackConfig = originalConfig // 原来的 module.exports 代码赋值给变量 webpackConfig

  module.exports = vuxLoader.merge(webpackConfig, {
    plugins: ['vux-ui']
  })
  ```

- 配置babel-loader以正确编译 VUX 的js源码（通过配置vux-loader实现）

  ``` js
  plugins: [{
    name: 'vux-ui'
  }]
  ```
- 安装less-loader以正确编译less源码

  ``` bash
  npm install less less-loader --save-dev
  ```
- 安装 yaml-loader 以正确进行语言文件读取

  ``` bash
  npm install yaml-loader --save-dev
  ```

- 添加viewport meta

  ``` html
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
  ```
- 添加Fastclick移除移动端点击延迟

  ``` js
  const FastClick = require('fastclick')
  FastClick.attach(document.body)
  ```
- 添加vue-router（如果不需要前端路由，可忽略）

  ``` js
  import VueRouter from 'vue-router'
  Vue.use(VueRouter)
  ```

- 添加webpack plugin, 在构建后去除重复css代码（通过配置vux-loader实现）

  ``` js
  plugins: [{
    name: 'duplicate-style'
  }]
  ```

- 如果你使用 webpack-simple 模板或者 webpack 配置里缺少 .vue extension 配置，请记得配置：

  ``` js
  resolve: {
    extensions: ['.js', '.vue', '.json']
  ```

## umd 使用

如果你是新项目，请直接使用`webpack`方式，`umd`构建产生的问题处理优先级会比较低。在下个主版本将只支持`webpack`。

详细请参照 <a router-link="/zh-CN/umd" style="color:#42b983;">文档</a>

## i18n 配置

<p class="warning">
  暂时只支持配合`vux-loader`使用。
  <br>
  如果你只需要默认的中文组件，那么你可以略过下面说明，只要启用`vux-ui`插件即可。
</p>

默认不配置此插件时，vux源码会按照默认语言`zh-CN`进行静态编译，和原来的使用没有明显不同。

详细请参照 <a router-link="/zh-CN/vux-loader?id=i18n" style="color:#42b983;">vux-loader的vux-i18n文档</a>

## 颜色配置

### 配置插件

<p class="warning">
  暂时只支持配合`vux-loader`使用。
  <br>
  注意的是主题文件不能引入其他less文件，只能为变量列表。
</p>

请配置vux-loader的`less-theme`插件，指定用以覆盖的less文件路径：

``` js
{
  name: 'less-theme',
  path: 'src/styles/theme.less'
}
```

### 可配置颜色

<p class="tip">
源码地址：<a href="https://github.com/airyland/vux/blob/v2/src/styles/variable.less">https://github.com/airyland/vux/blob/v2/src/styles/variable.less</a>
<br>
  更多配置需求请通过 issue 提出。
</p>

### demo站点的示例配置

源代码地址：[https://github.com/airyland/vux/blob/v2/src/theme.less](https://github.com/airyland/vux/blob/v2/src/theme.less)



## 路由

推荐使用官方 [vue-router](https://github.com/vuejs/vue-router)，`VUX`组件`link`属性直接支持`vue-router`的链接参数，`VUX2`模板也是内置了`vue-router`。

<p class="tip">
  如果使用了过渡(转场动画)，在`iPhone`上使用`左划返回`时动画会再执行一遍，目前没有找到可行的处理方法，如果你有处理方案，欢迎`PR`。
</p>

## 添加谷歌统计

单页面应用切换时要手动触发页面统计，首先在`index.html`里引入谷歌统计代码：

``` js
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-yourID', 'auto')
ga('send', 'pageview') // 是否要统计着陆页面访问，取决于你的需求，这个不一定需要，会和`router`统计有重复

```

``` js
// main.js 里，如果你使用了 vue-router
router.afterEach(function (to) {
  if (window.ga) {
    window.ga('set', 'page', to.fullPath) // 你可能想根据请求参数添加其他参数，可以修改这里的 to.fullPath
    window.ga('send', 'pageview')
  }
})
```

## 使用微信 jssdk

该插件提供了`commonJS`的引入方式。

<p class="warning">
  插件仅仅为了使用方便做了封装，任何 jssdk 相关的测试问题都和 VUX 无关，请参考微信官方文档，不要提 issue，更不要以为是 VUX 导致的问题。
</p>

<p class="warning">
  分享接口只有认证公众号才能使用，域名必须备案且在微信后台设置。
  <br>
  先确认已经满足使用`jssdk`的要求再进行编码。
  <br>
  <br>
  `WechatPlugin`在`vux@^2.1.0-rc.19`开始支持
</p>

``` js
import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)

console.log(Vue.wechat) // 可以直接访问 wx 对象。
```
那么之后任何组件中都可以通过 `this.$wechat` 访问到 `wx` 对象。

考虑到你需要在引入插件后调用`wx.config`方法进行配置，你可以通过 `Vue.wechat` 在组件外部访问`wx`对象。 

`jssdk`需要请求签名配置，你可以直接使用下面的`ajaxPlugin`。

## 发送 ajax 请求

<p class="tip">
  `AjaxPlugin`在`vux@^2.1.0-rc.20`开始支持
</p>

``` js
import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

console.log(Vue.http)
```

然后你可以和`vue-resource`一样在组件内使用`this.$http`进行调用了。

---

`AjaxPlugin` 插件依赖于 [axios](https://github.com/mzabriskie/axios)，需要注意的是`axios`是基于`Promise`的，因此如果你需要兼容低版本浏览器([caniuse](http://caniuse.com/#feat=promises))，需要引入`polyfill`。

`Polyfill` 推荐使用 [es6-promise](https://github.com/stefanpenner/es6-promise)

``` js
require('es6-promise').polyfill()
```

## 优化

### 页面切换显示loading

移动端如果使用异步组件加载那么还是需要一点等待时间的，在网络慢时等待时间会更长。显示`Loading`状态缓解一下用户等待情绪就十分重要。

如果你使用`vue-router`和`vuex`，那么可以很容易实现。

首先，注册一个`module`来保存状态

``` js
const store = new Vuex.Store({}) // 这里你可能已经有其他 module

store.registerModule('vux', { // 名字自己定义
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})
```

然后使用`vue-router`的`beforeEach`和`afterEach`来更改`loading`状态

``` js
router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})
```

在`App.vue`里使用`loading`组件并从`vuex`获取`isLoading`状态

``` html
<loading v-model="isLoading"></loading>
```

``` js
import { Loading } from 'vux'
import { mapState } from 'vuex'

export default {
  components: {
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.vux.isLoading
    })
  }
}
```

<p class="warning">
请特别注意不要忘了把 `store` 挂载到 Vue 实例上。
</p>

```js
new Vue({
  store,
  router,
```

done.

如果你觉得在加载比较快时`Loading`组件一闪而过体验也不大好，那么你可以延迟设置`loading=false`。

### 点击延迟

在`main.js`里引用`fastclick`

``` js
const FastClick = require('fastclick')
FastClick.attach(document.body)
```

### 异步加载组件

将所有页面组件一次性加载是一个很浪费资源和考验用户耐心的做法，尤其在移动端。

`webpack` 提供了[code splitting](https://webpack.js.org/guides/code-splitting-require/)，你可以按照下面写法实现当切换到特定路由时才加载代码。

``` js
{
  path: '/somepath',
  component: function (resolve) {
    require(['./demos/somepath.vue'], resolve)
  }
}
```

### inline manifest

<p class="tip">
  manifest文件为路径配置和异步组件名字列表，该做法可以减少一个`http`请求。
  <br>
  确保 `vux-loader`更新到 `^1.0.35`
</p>

首先在页面的`</body>`前加入代码：

``` html
<%=htmlWebpackPlugin.files.webpackManifest%>
```

然后在`vux-loader`配置的 `plugins` 列表中加入`inline-manifest`插件

``` js
{
  name: 'inline-manifest'
}
```

或者简化写法直接使用名字：

``` js
'inline-manifest'
```

## 开发

### 微信webview常见问题

<h4>iOS title 设置无效(该问题在微信版本6.5.x某个版本中已被修复)</h4>

在微信`iOS` `webview`更新到`WKWebView`之前我们可以通过加载一个`iframe`来实现单页面应用`title`更改。但是17年初更新到`WKWebView`后该方法也失效，据`对开发者十分特别不友好的把所有文档放在同一个页面不能通过url区分甚至连锚点也懒得做的`的`微信开发文档`([链接](https://mp.weixin.qq.com/wiki))说，`3月份会修复`。

原话如下：

> 使用WKWebView，在单页应用中通过document.title多次修改原生title的方法将失效，该问题将于微信3月份发布的版本中解决。

<h4>如何实现`weui.io`或者星巴克页面的设置顶部bar和页面下拉背景色</h4>

微信对于部分合作方开放了`jssdk`的`setBounceBackground`及`setNavigationBarColor`权限，目测暂无申请入口。

### 全局公用函数

如果你需要让一个工具函数在每个组件可用，可以把方法挂载到 `Vue.prototype`上。

`main.js` 中

``` js
Vue.prototype.method = function () {}
```

那么组件代码里

``` js
this.method()
```

### autoprefix 设置

`vue`官方模板的设置是`last 2 versions`，相对来说支持浏览器版本过少，会导致你在某些`Android`机子上出现问题。

如果你使用 `last 7 versions` 会生成不必要的`-ms`前缀代码.

因此建议同`WeUI`一样，使用配置 `['iOS >= 7', 'Android >= 4.1']`

### 禁用 eslint

并不推荐禁用`eslint`, 编码规范可以一定程序上保证代码质量。但是如果你确实想禁用，可以删除`build/webpack.base.conf.js`里的相关代码。

``` js
preLoaders: [
  {
   test: /\.vue$/,
   loader: 'eslint',
   include: [
     path.join(projectRoot, 'src')
   ],
   exclude: /node_modules/
  },
  {
   test: /\.js$/,
   loader: 'eslint',
   include: [
     path.join(projectRoot, 'src')
   ],
   exclude: /node_modules/
  }
]
```

如果你只是想禁用对某一文件的检测，那么可以在`.eslintignore`里添加规则。

如果你是想禁止某一行的检测，那么可以使用`// eslint-disable-line`。

更加灵活的使用参考 [eslint文档](http://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments)。

## 工具库

<p class="tip">
  实际项目开发中会有很多工具函数的需求，`VUX`提供这些工具库并不会让你的项目代码变得臃肿。
  <br>
  所有组件或者工具函数都是**按需使用**。
  <br>
  <br>
  对于有相关需求的开发者来说，不用自己写或者花时间去寻求合适的第三方库了，开箱即用。
</p>

### debounce 

<p class="warning">
  请注意了解 `debounce` 和 `throttle` 的区别。如果尚不清楚，请`google`之。
</p>

``` js
import { debounce } from 'vux'

debounce(func, [wait=0], [options={}])
```
[详细文档](https://lodash.com/docs/#debounce)

### throttle

``` js
import { throttle } from 'vux'

throttle(func, [wait=0], [options={}])
```

[详细文档](https://lodash.com/docs/#throttle)

### cookie

``` js
import { cookie } from 'vux'
```

`get *cookie.get(name, [options])*`

获取 cookie 值。`options` 参数可选，取值如下：

1. `converter` 转换函数。如果所获取的 cookie 有值，会在返回前传给 `converter`
函数进行转换。
1. 选项对象。对象中可以有两个属性：`converter` 和 `raw`. `raw` 是布尔值，为真时，不会对获取到的
cookie 值进行 URI 解码。

**注**：如果要获取的 cookie 键值不存在，则返回 `undefined`.

例子：

```js
// setup
document.cookie = 'foo=1'
document.cookie = 'bar=2'

cookie.get('foo')
// returns '1'

cookie.get('bar', function(s) { return parseInt(s); } )
// returns 2
```


`set *cookie.set(name, value, [options])`

设置 cookie 值。参数 `options` 可选，可以有以下属性：`path`（字符串）、`domain`（字符串）、
`expires`（数值或日期对象）、`raw`（布尔值）。当 `raw` 为真值时，在设置 cookie 值时，不会进行
URI 编码。

例子：

```js
cookie.set('foo', 3)

cookie.set('bar', 4, {
  domain: 'example.com',
  path: '/',
  expires: 30
})
````


`remove *cookie.remove(name, [options])`

移除指定的 cookie.

例子：

```js
cookie.remove('foo')

cookie.remove('bar', {
  domain: 'example.com',
  path: '/'
})
````

### base64

``` js
import { base64 } from 'vux'

base64.encode('VUX')
base64.decode('VlVY')
```

### md5

<p class="tip">
  该工具直接依赖于 [blueimp-md5](https://github.com/blueimp/JavaScript-MD5)
  <br>
  注意: `md5`是消息摘要算法并非加密算法，用于需要加密的场景会有安全问题。
</p>

```
import { md5 } from 'vux'

md5('VUX')
```

### date 日期格式化

相对`moment`来说`十分轻量`的实现。

import { dateFormat } from 'vux'

``` js
dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
```

### number 格式化工具

`numberComma`用于分割数字，默认为3位分割，一般用于格式化`金额`。

`numberPad`用于按照位数补0

`numberRandom`用于生成两个整数范围内的随机整数

``` js
import { numberComma, numberPad, numberRandom } from 'vux'
numberComma(21342132) // 21,342,132
numberComma(21342132, 4) // 2134,2132
numberComma(21342132.234) // 21,342,132.234

numberPad(1) // 01
numberPad(234, 4) // 0234

numberRandom(1, 7) // 2
```

### string 处理工具

``` js
import { stringTrim } from 'vux'

stringTrim(' 1024 ') // 1024
```

### url 参数解析

```js
import { querystring } from 'vux'

querystring.parse('a=b&c=d') // {a:'b',c:'d'}, 默认参数为 location.search

querystring.stringify({a:'b',c:'d'}) // 'a=b&c=d'，注意不支持复杂嵌套的结构
```

## 常见问题

- 能否在微信小程序里使用

  Sorry，不能。微信小程序是个相对封闭的平台，无法方便地适配。

- 文档是用什么工具编写的？

  [Docute](https://docute.js.org) by [egoist](https://github.com/egoist)。在`Docute`基础上做了一点样式修改。

- Can't resolve '../inline-desc' in

  webpack resolve配置

  ``` js
  resolve: {
    extensions: ['', '.js', '.vue', '.json']
  }
  ```
- 初始化时eslint选择 airbnb 报import extension
  
  项目目录下的.eslintrc.js 修改：

  ``` js
  'rules': {
      // don't require .vue extension when importing
      'import/extensions': ['off', 'always', { // 设为 off
        'js': 'never',
        'vue': 'never'
      }],
      'import/no-unresolved': [0, {commonjs: true, amd: true}], // 添加这一行
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
  ```

  报`document`不存在，请在rules前添加配置：

  ``` js
  'globals': {
    'document': true
  },
  'rules' balabala
  ```

- $t is not defined

  请参照文档配置 `vux-loader`

  demo例子使用`$t`是因为demo启用了`i18n`，如果你没有使用`vuex-i18n`等相关`i18n`插件，请不要使用`$t`函数

  如果已经配置`vux-loader`但依然有错误，请清除`node_modules`使用`npm install`重新安装，`cnpm install`可能会导致出问题。

- Uncaught SyntaxError: Unexpected token export

 原因是Vux的js源码没配置babel，你可以在webpack配置的loaders加上

  ``` js
  {
    test: /vux.src.*?js$/,
    loader: 'babel'
  }
  ```

  或者启用`vux-loader`的`vux-ui`插件。

- 样式冗余

  调试时有多个重复样式是正常的，因为不同组件引用了同样的less源码，而调试时是直接把不同组件样式用`<style>`标签插入页面。

  确保在vux-loader里使用`duplicate-style`来实现对构建css进行压缩。

- Vux 是否为微信官方项目

  否。但是依赖的WeUI是微信团队的开源项目，感谢微信团队。

- 为什么部分组件要加`x-`前缀

  若不更名，可能在开发时与标准html标签相同而导致冲突或者bug。从Vue@2.x开始已经强制不能使用原生html标签。

- 为什么不把组件打包成js进行分发

  代码冗余，无法在构建时优化，出错时难以跟踪，作为组件维护者可能要打包多份代码出来满足不同需求(压缩版，未压缩，不同语言版)。在webpack中如果不加配置还会被多次打包。

  整体打包成一个js和一个css在移动端属于严重浪费，降低体验和性能。

  就上面的问题来说，源码分发的方式完美解决。

## Next

- `vux-playground` 支持在线编辑和预览基于vux的页面，也是为了方便重现bug
- `vux-shop` 基于vux的完整前端商城模板

## 其他

### 本地开发

<p>
请更新 `NodeJS` 版本到 `v7.6.0` 以上，`build` 命令逐步使用 `async`。
</p>

``` bash
yarn // 使用 yarn.lock 保证依赖版本一致
yarn dev
```

### 本地查看文档

``` bash
npm run build-docs // 构建文档
npm run docs // 使用 docute 预览文档
```

### 如何贡献

遵从 Github 上的 contribution template.

如果修改了组件代码，需要在组件目录的`metas.yml`加上changes，直接使用`next`作为版本号(如果已经存在该版本号，则直接添加变更条目即可)。

中括号内为变更类型，可选值 `fix` `enhance` `feature` `change`

比如：

``` yml
changes:
  next:
    en:
      - '[fix] fix *** bug #issueId'
    zh-CN:
      - '[fix] 修复 *** bug #issueId'
```

### 如何更新文档

目前英文文档并不完善，欢迎帮忙翻译。文档格式为`yml`，位于每个组件目录下的`metas.yml`文件，你可以参阅一些相对完善的组件文档进行更新。

当`PR`被合并后，文档服务器会在`5分钟`内拉取最新代码并执行`npm run build-docs`及`npm run build`实现文档及`demo`更新。

### 如何提 Issue

<p class="tip">
  使用本项目意味着你也有义务帮助其变得更好。
</p>

不要浪费维护者时间。

不要让维护者帮你学习`Vue`，帮你熟悉`vue-loader`，甚至帮你写代码。

不要认为随便一句话就能让维护者明白你的意思，我们没有你想象的那么厉害。

不要提没有任何意义的、代码中带有业务逻辑不方便重现的Issue。

直接关闭你的`issue`不是对你不满，是你提问题方式不对，没有必要再浪费时间说明为什么要关闭你的`issue`。

### Thanks

> Vux 参考或者使用了以下开源项目的代码

+ [Vue](https://github.com/vuejs/vue)
+ [WeUI](https://github.com/weui/weui)
+ [FrozenUI](https://github.com/frozenui/frozenui)
+ [Ant Design](https://github.com/ant-design/ant-design)
+ [Ant Design Mobile](http://github.com/ant-design/ant-design-mobile)
+ [XScroll](https://github.com/huxiaoqi567/xscroll)
+ [Ionic](https://github.com/driftyco/ionic)
+ [SUI Mobile](https://github.com/sdc-alibaba/SUI-Mobile)
+ [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe)

#### 工具框架

- 世界上最好的语言 `JavaScript`
- 啥都能做的前端构建工具 [Webpack](https://webpack.js.org/)
- 简单好用的文档展示工具 [Docute](https://docute.js.org/#/)

#### 主要维护者
+ [airyland](https://github.com/airyland)
+ [lichunqiang](https://github.com/lichunqiang)
+ [graysheeep](https://github.com/graysheeep)
+ [unclay](https://github.com/unclay)
+ [wg5945](https://github.com/wg5945)
