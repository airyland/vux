---
nav: zh-CN
---

<h2 class="big-title">VUX</h2>

<p align="left">
  <a href="https://www.npmjs.com/package/vux">
    <img src="https://img.shields.io/npm/v/vux.svg?style=flat-square" alt="">
  </a>
  <a href="https://www.npmjs.com/package/vux">
    <img src="https://img.shields.io/npm/dm/vux.svg?style=flat-square" alt="">
  </a>
  <br>
  <br>
  <a href="https://vux.li/demos/v2?x-page=v2-doc-home">
    <img src="https://static.vux.li/demo_v2_doc_home.png" width="100" alt="">
  </a>
  <br>
  <a href="https://vux.li/demos/v2?x-page=v2-doc-home">
    预览地址>>
  </a>
</p>

<p class="tip">
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

## 安装使用(webpack)

<p class="warning">
  如果你从没使用过`VUX`，请直接看下面的快速入门。
</p>

直接安装或者更新：

``` js
npm install vux --save
```

如果你是从`0.x`更新，请参考： <a router-link="/zh-CN/upgrade-to-2" style="color:#42b983;">更新到`2.x`</a>


<p class="warning">
vux2必须配合`vux-loader`使用, 请在`build/webpack.base.conf.js`里参照如下代码进行配置：
</p>

``` js
const vuxLoader = require('vux-loader')
module.exports = vuxLoader.merge(webpackConfig, {
  options: {},
  plugins: [
    {
      name: 'vux-ui'
    }
	]
})
```

<p class="warning">
vux@0.x 已经停止维护，请尽快迁移到 vue@2.x & vuex@2.x & vux@2.x，虽然要花点时间，但是完全值得。
</p>

### 快速入门

> 使用 `vue-cli` 工具和 `airyland/vux2` 模板快速初始化项目

``` js
npm install vue-cli -g // 如果还没安装
vue init airyland/vux2 project

cd project
npm install // 使用 cnpm 安装可能会出现问题，推荐使用 npm --registry=https://registry.npm.taobao.org
npm run dev
```

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

- 配置vue-loader（通过配置vux-loader实现）

  ``` js
  // vux-loader
  plugins: [{
    name: 'vux-ui'
  }]
  ```
- 配置babel-loader以正确编译Vux的js源码（通过配置vux-loader实现）

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
  ## 组件 umd 文件

  <p class="tip">
  从`2.0`开始，推荐使用`webpack`来调用组件，因此不再在`repo`中保存`umd`文件，但提供了生成命令。
  <br>
  例子可查看：[https://github.com/airyland/vux/tree/v2/docs/examples](https://github.com/airyland/vux/tree/v2/docs/examples)
  </p>

  ### 生成命令

  ``` bash
  git clone https://github.com/airyland/vux.git --depth=1 // or just update: git pull
  cd vux
  npm install
  npm run build-components
  ```

  默认生成的语言是`zh-CN`，模块命名空间为`vux`，如`vuxGroup`，`vuxCell`，你可以在命令行中配置。

  ```
  npm run build-components -- --locale='en' --namespace='X'
  ```

  ### 目录结构

  生成的文件夹结构如：

  <p class="tip">
  出于目录结构一致性考虑，即使是子组件也是一个文件夹，并且会有一个空的`index.min.css`样式文件。
  </p>

  ```
  |- dist/
    |- vux.min.js ------------ 所有组件打包，仅用于测试，不推荐在生产环境使用
    |- vux.min.css ----------- 所有组件样式打包，同样仅用于测试
    |- components
        |- actionsheet
          |- index.min.js -------- 组件js代码
          |- index.min.css ------- 组件css代码
  ```

  <p class="tip">
  vux.min.js 包括了所有的组件、插件及默认地址库，都挂载在全局变量vux上。当然为了使用方便同样直接挂载到了`window`上。
  <br>
  组件调用举例: `vuxCell`
  <br>
  插件调用举例：`vuxAlertPlugin`
  <br>
  默认地址库调用：`vuxChinaAddressData`
  </p>

  ### 组件使用

  ``` html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>scripts</title>
    <link rel="stylesheet" href="../dist/vux.min.css">
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="demo">
      <group>
        <cell title="Vue" :value="how"></cell>
      </group>
    </div>

    <script src="../dist/components/group/index.js"></script>
    <script src="../dist/components/cell/index.js"></script>

    <script>
    Vue.component('group', vuxGroup)
    Vue.component('cell', vuxCell)
    new Vue({
      el: '#demo',
      data: {
        how: 'Cool'
      }
    })
    </script>
  </body>
  </html>
  ```
### 插件使用


``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
  <title>scripts</title>
  <link rel="stylesheet" href="../../dist/styles/reset.css">
  <link rel="stylesheet" href="../../dist/plugins/alert/index.min.css">
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
</head>
<body>
  <div id="demo">
  </div>

  <script src="../../dist/plugins/alert/index.min.js"></script>

  <script>
  Vue.use(vuxAlertPlugin)

  new Vue({
    el: '#demo',
    data: {
      how: 'Cool'
    },
    mounted () {
      this.$vux.alert.show('hello')
    }
  })
  </script>
</body>
</html>
```

### 生成css工具样式

包括`1px`解决方案，构建文件位于`dist/styles/*.css`,构建方式：

``` bash
npm run build-styles
```

<p class="tip">为了使用方便，可以使用`npm run xbuild`来执行`build-components` 及 `build-styles`</p>

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

``` css
@theme-color: #04BE02;

/**
* tabbar
*/
@tabbar-text-active-color: #09BB07;

/**
* tab
*/
@tab-text-disabled-color: #ddd;
@tab-text-default-color: #666;
@tab-text-active-color: @theme-color;
@tab-bar-active-color: @theme-color;

/**
* dialog
*/
@dialog-button-text-primary-color: #0BB20C;
@dialog-button-text-default-color: #353535;

/**
* x-number
*/
@number-button-font-color: #3cc51f;
@number-input-font-color: #666;

/**
* checkbox
*/
@checkbox-icon-color-checked: #09BB07;

/**
* check-icon
*/
@check-icon-color-checked: @checkbox-icon-color-checked;

/**
* Cell
*/
@cell-label-color: #000;

/**
* Mask
*/
@dialog-mask-background: rgba(0, 0, 0, .6);

/**
* Range
*/
@range-disabled-opacity: @opacity-disabled;
@range-bar-default-color: #a9acb1;
@range-bar-active-color: @theme-color;

/**
* Tabbar
*/
@tabbar-index: 100;

/**
* Header
*/
@header-background-color: #35495e;
@header-title-color: #fff;
@header-text-color: #ccc;
@header-arrow-color: #ccc;

/**
* Timeline
*/
@timeline-item-bg-color: @theme-color;

/**
* Switch
*/
@switch-checked-bg-color: @theme-color;
@switch-checked-border-color: @theme-color;
@switch-disabled-opacity: 0.6;

/**
* Button
*/
@button-warn-bg-color: #EF4F4F;
@button-warn-active-color: #C13E3E;

/**
* Cell
*/
@cell-body-label-color: #000;

/**
* Badge
*/
@badge-bg-color: #f74c31;

/**
* Popover
*/
@popover-bg-color: #35495e;
@popover-font-color: #fff;
@popover-border-radius: 3px;
@popover-border-width: 5px;

/**
* Button tab
*/
@button-tab-active-border-color: @color-wechat-green;
@button-tab-active-background-color: @color-wechat-green;
@button-tab-active-font-color: #FFF;

/**
* Swiper
*/
@swiper-indicator-active-color: @theme-color;

/**
* checklist
*/
@checklist-icon-active-color: #09BB07;

/**
* popup-picker
*/
@popup-picker-header-text-color: @theme-color;
```

### demo站点的示例配置

源代码地址：[https://github.com/airyland/vux/blob/v2/src/theme.less](https://github.com/airyland/vux/blob/v2/src/theme.less)

``` css
@yellow: #ffe26d;
@button-tab-active-border-color: #ccc;
@button-tab-active-background-color: @yellow;
@button-tab-active-font-color: #000;

@switch-checked-bg-color: @yellow;
@switch-checked-border-color: @yellow;

@number-button-font-color: #FF9900;

@swiper-indicator-active-color: #FF9900;

@checklist-icon-active-color: #FF9900;

@tab-text-active-color: #FF9900;
@tab-bar-active-color: #FF9900;

@dialog-button-text-primary-color: #FF9900;

@form-preview-button-primary-color: #FF9900;
```

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

console.log(WechatPlugin.$wechat) // 可以直接访问 wx 对象。
```
那么之后任何组件中都可以通过 `this.$wechat` 访问到 `wx` 对象。

考虑到你需要在引入插件后调用`wx.config`方法进行配置，你可以通过 `WechatPlugin.$wechat` 在组件外部访问`wx`对象。 

## 发送 ajax 请求

<p class="tip">
  `AjaxPlugin`在`vux@^2.1.0-rc.20`开始支持
</p>

`ajax`请求推荐使用 [axios](https://github.com/mzabriskie/axios)

需要注意的是`axios`是基于`Promise`的，因此如果你需要兼容低版本浏览器([caniuse](http://caniuse.com/#feat=promises))，需要引入`polyfill`。

`Polyfill` 推荐使用 [es6-promise](https://github.com/stefanpenner/es6-promise)

``` js
require('es6-promise').polyfill()
```

--- 

如果你非常非常懒并且觉得`axios`名字比较奇怪，`VUX`直接把`axios`封装成插件，你可以直接引用插件。

``` js
import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

console.log(AjaxPlugin.$http)
```

然后你可以和`vue-resource`一样在组件内使用`this.$http`进行调用了。

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

然后在`vux-loader`配置中加入`inline-manifest`插件

``` js
{
  name: 'inline-manifest'
}
```

## 禁用 eslint

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

``` bash
yarn // 使用 yarn.lock 保证依赖版本一致
yarn run dev
```

### 本地查看文档

``` bash
npm run build-docs // 构建文档
npm run docs // 使用 docute 预览文档
```

### 如何贡献

遵从 Github 上的 contribution template.

### 如何更新文档

目前英文文档并不完善，欢迎帮忙翻译。文档格式为`yml`，位于每个组件目录下的`metas.yml`文件，你可以参阅一些相对完善的组件文档进行更新。

当`PR`被合并后，文档服务器会在`5分钟`内拉取最新代码并执行`npm run build-docs`及`npm run build`实现文档及`demo`更新。

### 如何提 Issue

<p class="tip">
  使用本项目意味着你也有义务帮助其变得更好。
</p>

不要提没有任何意义的、代码中带有业务逻辑不方便重现的Issue。


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
