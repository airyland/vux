---
nav: zh-CN
---

<h2 class="big-title">vux!vue</h2>

<p align="left">
  <a href="https://www.npmjs.com/package/vux-loader">
    <img src="https://img.shields.io/npm/v/vux-loader.svg?style=flat-square" alt="">
  </a>
  <a href="https://www.npmjs.com/package/vux-loader">
    <img src="https://img.shields.io/npm/dm/vux-loader.svg?style=flat-square" alt="">
  </a>
</p>


### 介绍

`vux-loader`工具的作用是对`.vue`代码进行预处理，不限于 vux 组件库。

它是针对`webpack+vue-loader`项目的工程化工具，简化了webpack插件和loader的使用和编写，支持在vue-loader处理之前进行预处理，同时内置对vux组件专用的配置和优化插件。

当然除了.vue文件外，你还可以对js文件进行预处理。说好的处理.vue文件，为什么连`js`文件也不放过呢？因为只有处理js才能实现理想工程化。举个例子，如果用户需要在`main.js`中调用vux的plugin，他需要这样做：

``` js
import AlertPlugin from 'vux/src/plugins/Alert'
import ToastPlugin from 'vux/src/plugins/Toast'
```
虽然路径不长，但是看着相当不和谐，为了简化这个操作vux提供了更简洁的写法：

``` js
import { AlertPlugin, ToastPlugin } from 'vux'
```

这个操作即是通过`js-parser`插件解析main.js里的`import`语法来实现的，最终进入babel的代码和上面单独引入一致。

这个工具也许会帮你进一步打开`Vue`项目工程化的思路。

<p class="tip">
  作为通用工具，即使你没有使用Vux，依然可以使用它来进行各种代码处理。
  <br>
  目前支持 vue-loader@>9.x, 低版本没有具体测试。
  <br>
  `vux!vue`的loader写法只兼容webpack@1.x，为了兼容webpack@2.x，处理后的loader配置是`vux-loader!vue-loader`
</p>

### 实现方式

说明一下`vux-loader`是如何和`vue-loader`<del>搞基</del>配合的，vue-loader的issue里不少同学遇到预处理.vue的问题。

如果你看过`webpack`loader的介绍，理论上说如果需要自己手动先处理代码再传入`vue-loader`,你只需要这样对loader做配置: `vue-loader!my-loader`。但是如果你试过，就知道这个目前行不通。`vue-loader`不会接收上一个loader的source进行处理，因为.vue文件的特殊性，它直接生成了loader string进入下一个处理，处理后的结果大概是这样的：

``` js
/* styles */
require("!!vue-style-loader!css-loader!vue-loader/lib/style-rewriter?id=data-v-20d7ba9a!vue-loader/lib/selector?type=styles&index=0!./index.vue")

/* script */
__vue_exports__ = require("!!babel-loader!vue-loader/lib/selector?type=script&index=0!./index.vue")

/* template */
var __vue_template__ = require("!!vue-loader/lib/template-compiler?id=data-v-20d7ba9a!vue-loader/lib/selector?type=template&index=0!./index.vue")
```

那么vue-loader提供了自定义loader string的选项，直接配置可否呢，[#531](https://github.com/vuejs/vue-loader/issues/531)，直接配置会破坏原来的loader参数，导致不能Live reload。

那么最终能想到的就是直接修改`vue-loader`生成的代码，这样既不会影响`vue-loader`原来的逻辑，也能自由控制。

最终实现方式是前置`vux-loader`即：`vux-loader!vue-loader`，vux-loader将vue-loader生成的代码二次处理，分割loader string并(强行)插入vux的 template-loader, style-loader, script-loader，那么你就能理解vux-loader的配置方式了，在3大基本loader里获取到vux-loader的插件配置列表逐个做处理就行了。

上面的代码强行处理后是这样的：

``` js
/* styles */
require("!!vue-style-loader!css-loader!vue-loader/lib/style-rewriter?id=data-v-20d7ba9a!./../../../../vux-loader/src/style-loader.js!vue-loader/lib/selector?type=styles&index=0!./index.vue")

/* script */
__vue_exports__ = require("!!babel-loader!vue-loader/lib/selector?type=script&index=0!./../../../../vux-loader/src/script-loader.js!./index.vue")

/* template */
var __vue_template__ = require("!!vue-loader/lib/template-compiler?id=data-v-20d7ba9a!./../../../../vux-loader/src/template-loader.js!vue-loader/lib/selector?type=template&index=0!./index.vue")
```

原理就是这么简单（但是处理时还是遇到一些问题），为了方便使用，编写了常用的一些插件。

至于`js-parser`就只是在`babel-loader`前加上了`vux-loader`的`js-loader`。

而所有的loader, plugins设置都是在`vux-loader`的`merge`方法里来完成。

### 实际使用场景

我们可以使用`vux-loader`做一些很有意思的事。
比如 [#542](https://github.com/vuejs/vue-loader/issues/542) 提到的根据当前feature为判断要输出哪一部分代码，现在已经直接支持，请看 `template-feature-switch`部分。

对于公用组件而言，完全可以实现构建时进行组件瘦身，只保留使用到的代码。

当然如果你愿意，你完全可以自己实现一门语言。

## 安装

``` bash
npm install vux-loader --save-dev
```

## 使用

为了减少使用成本，只需要调用`merge`方法对原来`webpack`配置进行操作：

``` js
const webpackConfig = {} // 原来的webpack配置

const vuxLoader = require('vux-loader')

module.exports = vuxLoader.merge(webpackConfig, {
  options: {},
  plugins: [{
    name: 'vux-ui'
  }]
})
```

<p class="warning">
  更新配置后需要重启npm run dev命令
</p>

### Options

- `env` 非必选，定义当前环境变量，只在vux-loader里使用，用来判断哪些插件需要被执行(如果plugin有定义envs的话)，目的是实现一份配置多个环境使用。


### Plugins

插件为一个数组列表，根据需要可以添加你需要的插件，插件名为必须，有些组件不需要额外配置选项。

公用参数为:

- `name` `必须`，插件名字
- `envs` `非必须`，数组，当前插件在哪些环境变量里执行，不定义则默认执行

下面的插件配置代码将省略 `plugins:[]`的书写。

#### script-parser

> script代码替换处理

``` js
[{
 name: 'script-parser',
 fn: function (source) {
   return source.replace('VARIABLE', 'v2')
 }
}]
```

#### style-parser

> style代码替换处理

``` js
[{
 name: 'style-parser',
 fn: function (source) {
   return source.replace('black', 'white')
 }
}]
```
#### template-parser

> template代码替换处理

> 适用于对`<template></template>`模板代码做自定义处理
> 适用于某些更改不频繁但非服务端配置的文字，可能调用多次，也可能手动更改或者批量替换相对麻烦
>
> 同样你也可以用来从接口获取最新配置替换特定的占位字符
>
> 当然也适用于在源码中对`pm`进行吐槽(千万要记得production环境要有配置，否则可能会上新闻。)

   * name 插件名字， `template-parser`
   * replaceList 非必须，正则匹配列表，将直接调用 `replace` 方法进行替换
   * fn 非必须，相比params更灵活的方法，可以对字符串进行处理后返回

插件配置：

``` js
[
  name: "template-parser",
  replaceList: [{
    test: /DeathToPM/g,
    replaceString: '微博-随时随地发现新鲜事'
  }, {
    test: /呵呵我们压根没有底线/g,
    replaceString: '我是有底线的'
  }],
  fn: function (templateSource) {
    return templateSource.replace('智障', '机智')
  }
]
```

#### js-parser

> 项目里js文件处理，在babel-loader前进行处理

``` js
[{
 name: 'js-parser',
 fn: function (source) {
   return source.replace('black', 'white')
 }
}]
```

#### template-feature-switch

实现根据变量切换template代码

参数：

- `features`，变量列表，值只能为true或者false

``` js
{
  name: 'template-feature-switch',
  features: {
    feature1: true,
    feature2: false
  }
}
```

``` html
<template>
  <div>
    <on feature="feature1">
      AWESOME FEATURE 1 is ON
    </on>
    <off feature="feature1">
      AWESOME FEATURE 1 is OFF
    </off>
  </div>
</template>
```
那么当 feature1 为 true时，将输出 `AWESOME FEATURE 1 is ON`, 反之则输出 `AWESOME FEATURE 1 is OFF`。注意`on`标签内不限定内容，可以为任何标签代码块，但`避免在on off 里面再嵌套 on off`


#### vux-ui

<p class="warning">
  vux组件的配套工具，如果没有使用vux, 不需要添加。
</p>

如果配合`vux`使用，需要手动启用。默认不需要设置选项。

该插件做了以下处理：

- 配置`babel`编译 vux 的js源码
- 修改vue-loader为 `vux-loader!vue-loader`
- `import`组件调用解析为单组件引入

```
{
  name: 'vux-ui'
}
```

那么你就可以很方便地引入组件了：

```
// 0.x
import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'

// 2.x
import { Group, Cell } from 'vux'
```

#### i18n

<p class="warning">
请使用正确的 yml 格式。冒号和值之间是有一个空格的，错误的格式将无法生效。
</p>

``` yml
on-show:
  en: emits when popup shows
  zh-CN: 弹窗显示时触发
```


1. 如果你只是调用中文语言的vux组件，那么你不需要做任何配置。

2. 如果你需要调用英文语言的vux组件，需要配置语言

  ``` js
  {
    name: 'i18n',
    vuxStaticReplace: true,
    vuxLocale: 'en'
  }
  ```
3. 如果你想和demo站点一样可以写`i18n`block，并且需要动态切换语言，那么需要配置插件抽取i18n的内容，并设置非静态替换

  ``` js
  {
    name: 'i18n',
    vuxStaticReplace: false,
    staticReplace: false,
    extractToFiles: 'src/locales/components.yml',
    localeList: ['en', 'zh-CN']
  }
  ```

然后你就可以引用`vuex-i18n`插件实现多语言切换了。

参考 [main.js](https://github.com/airyland/vux/blob/254574ef30a8c4d341feb7d2ff8245792657bda2/src/main.js#L84-L96) 及 [vuex-i18n 文档](https://www.npmjs.com/package/vuex-i18n)(仅当参考，你也可以使用其他i18n插件)。

#### less-theme

<p class="warning">
注意，path所在文件必须是简单的less变量对，不能import其他文件或者引入变量。
</p>

> less 变量设置和替换

> 适用于全局变量替换,  方便切换主题
> 这意味着，你不再需要为每个页面引入全局的less文件了，你只需要设置lang为less就可以直接使用变量了

```
<style lang="less">
.info {
 color: @font-size;
}
</style>
```

插件配置：

``` js
{
  name: 'less-theme',
  path: 'src/styles/theme.less'
}
```

#### duplicate-style

> css 重复代码清除

<p class="tip">
  建议使用vux组件的用户使用，因为vux直接引用less，最终构建的css文件确实会有冗余。
</p>


> 在webpack 构建完成后对生成的css文件使用cssnano进行重复样式清除。建议只在production环境下开启，因为dev环境没有必要。

``` js
{
  name: 'duplicate-style',
  events: {
    done: function () {
      console.log('done!')
    }
  }
}
```

#### html-build-callback

>html文件处理事件回调

> 适用于在写入html(一般为index.html)文件前进行内容修改，比如替换特定内容
> 比如写入js配置变量，改变cdn域名，将manifest文件直接写入html以减少请求等

``` js
{
  name: 'html-build-callback',
  events: {
   'after-html-processing': function (data, cb) {
      data.html += 'magic footer'
      cb(null, data)
   }
  }
}
```

可用事件请参考 [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)


#### build-done-callback

> 构建完成事件回调
> 本质上是在webpack plugin的 done 事件后触发

``` js
{
 name: 'build-done-callback',
 fn: function () {
   console.log('done!')
 }
}
```

### 使用案例


#### 统一引入less(sass)变量

如果你翻看`vue-loader`的issue, 就会发现不少同学在说，为什么sass, less 变量不能全局使用，需要在每个.vue组件里引入，这个很重复，有没有办法解决。目前除了在webpack里定义路径`alias`外没有其他方法。但是有了`vux-loader`，你可以用`style-parser`在每个`.vue`文件的style前面加上变量的引入了，只要一句代码。

```
{
  name: 'style-parser',
  fn: function (source) {
    return "@import '../styles/variable.less'\n" + source // 你可以根据this.resourcePath 来确定是否要引入以及引入的相对路径
  }
}
```

#### 减少重复代码

`vux`的组件有几十个，同样demo也有几十个，因为webpack并不支持require变量，那么在main里中实现每个组件异步加载都需要这样：

``` js
const routes = [
  {
    path: '/component/actionsheet',
    component: function (resolve) {
      require(['./demos/Actionsheet'], resove)
    }
  }
]
```
作为懒人，写几十次这样的代码是一件比较烦人的事，作为热爱地球的人，这样也很不环保，但是有了`vux-loader`, 我们可以这样：

``` js
const routes = []
```

然后在`js-parser`里获取列表数组直接替换， 并且可以调用webpack的`this.addDependency`添加依赖实现修改列表时自动`reload`。从此添加删除组件只要加上或者删除名字就可以了，真是<del>懒</del>机智。

``` js
 {
  name: 'js-parser',
  test: /main\.js/,
  fn: function (source) {
    this.addDependency(demoPath)
    let list = fs.readFileSync(demoPath, 'utf-8')
    list = JSON.parse(list)
    let str = []
    list.forEach(one => {
      str.push(`{
path: '/component/${toDash(one)}',
component: function (resolve) {
require(['./demos/${one}.vue'], resolve)
}
}`)
    })

    str = `[${str.join(',\n')}]`
    source = source.replace('const routes = []', 'const routes = ' + str)
    return source
  }
}
```

#### 实现import语法转换

vux是没有main入口文件的，因此需要把import语句转换成单个组件引入。但是因为对语法树分析比较烦，能用正则替换的当然就是用正则替换，简单粗暴实用。具体可以看源码。

#### 开源组件多语言支持

如果以js方式分发，一般默认一个语言，用户可以加上另外的语言包，但是代码里必不可少存在相应的转换函数，对于只需要单语言的人来是个浪费和繁琐。要么所有一起打包，这个也极浪费。要么一个一个打包，这样又失去了动态多语言支持。

于是`vux`在`vux-loader`的支持下实现了`使用时构建`，无论是静态输出和动态支持。

### Bug 反馈 && 功能建议

请到[https://github.com/airyland/vux-loader/issues](https://github.com/airyland/vux-loader/issues)

### Todo

- [ ] 支持各个插件的异步返回形式
- [ ] 在插件中提供webpack的 this 参数
