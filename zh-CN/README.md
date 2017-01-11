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
</p>


## 简介

Vux（读音 [v'ju:z]，同`views`）是基于`WeUI`和`Vue`(2.x)开发的移动端UI组件库，主要服务于微信页面。

基于`webpack`+`vue-loader`+`vux`可以快速开发移动端页面，配合`vux-loader`方便你在`WeUI`的基础上定制需要的样式。

`vux-loader`保证了组件按需使用，因此不用担心最终打包了整个vux的组件库代码。

`vux`并不完全依赖于`WeUI`，但是尽量保持整体UI样式接近`WeUI`的设计规范。最初目标是创建一个`易用`，`实用`，`美观`的移动端UI组件库，现在离理想状态还有不少距离，因此需要大家及时反馈问题及贡献代码。

即使你不使用vux的代码, 但能从源码得到一些参考那么也是件让人高兴的事情。

<p class="warning">
  vux@2.x 暂时只支持`webpack+vue-loader`方式的开发，没有生成组件的umd文件。也不建议使用引入`script`的方式进行开发，因为它会带来一系列的开发、维护、效率、部署问题。
  <br>
  <br>
  Life is short, use webpack. 
</p>

## 安装使用

直接安装：

``` js
npm install vux --save
```

<p class="warning">
vux@2.x 版本刚发布，如果使用有问题请及时提出，会快速解决。
<br>
vux@0.x 即将停止维护，请尽快迁移到 vue@2.x & vuex@2.x & vux@2.x，虽然要花点时间，但是完全值得。
</p>

### - 快速入门(webpack)

> 使用 `vue-cli` 工具和 `airyland/vux2` 模板快速初始化项目

``` js
npm install vue-cli -g // 如果还没安装
vue init airyland/vux2 project

cd project
npm install
npm run dev
```

### - 调用示例

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

### - 手动使用(webpack)

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

## i18n 配置

<p class="warning">
  暂时只支持配合`vux-loader`使用。
  <br>
  如果你只需要默认的中文组件，那么你可以略过下面说明，只要启用`vux-ui`插件即可。
</p>

默认不配置此插件时，vux源码会按照默认语言`zh-CN`进行静态编译，和原来的使用没有明显不同。

详细请参照 <a router-link="/vux-loader?id=vux-i18n" style="color:#42b983;">vux-loader的vux-i18n文档</a>


## 颜色配置

### - 配置插件

<p class="warning">
  暂时只支持配合`vux-loader`使用。
</p>

请配置vux-loader的`less-theme`插件，指定用以覆盖的less文件路径：

``` js
{
  name: 'less-theme',
  path: 'src/styles/theme.less'
}
```

### - 可配置颜色

<p class="tip">
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

### - demo站点的示例配置

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

@tab-active-font-color: #FF9900;
@tab-active-bar-color: #FF9900;
```

## 常见问题

- 能否在微信小程序里使用
  
  Sorry，不能。微信小程序是个相对封闭的平台，无法方便地适配。

- 文档是用什么工具编写的？

  [Docute](https://docute.js.org) by [egoist](https://github.com/egoist)。在`Docute`基础上做了一点样式修改。
  

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

### 如何贡献

遵从 Github 上的 contribution template.

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
