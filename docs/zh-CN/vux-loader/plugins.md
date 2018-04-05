---
title: vux-loader 插件列表
---

# vux-loader 插件列表


## script-parser

> .vue 文件的 script 部分代码处理

``` js
[{
 name: 'script-parser',
 fn: function (source) {
   return source.replace('VARIABLE', 'v2')
 }
}]
```

## style-parser

> `<style></style>` 代码处理

``` js
[{
 name: 'style-parser',
 fn: function (source) {
   return source.replace('black', 'white')
 }
}]
```
## template-parser

> template代码替换处理

> 适用于对`<template></template>`模板代码做自定义处理


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

## template-feature-switch

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


## vux-ui

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

## i18n

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

参考 [main.js](https://github.com/airyland/vux/blob/v2/src/main.js#L84-L96) 及 [vuex-i18n 文档](https://www.npmjs.com/package/vuex-i18n)(仅当参考，你也可以使用其他i18n插件)。

## less-theme

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

## duplicate-style

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

## html-build-callback

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


## build-done-callback

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