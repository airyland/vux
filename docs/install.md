[zh-CN]
> Vux推荐从`src/components`里引入组件，因为体积小而且配合`vux-loader`可以最大效率工程化。

后面将逐渐不支持umd的形式，即不再构建`dist`目录的umd文件，新的一些feature将使用webpack loader 来支持。

Vux组件的样式是各组件独立，因为你只需要保证项目有reset样式或者直接从`vux/src/styles/reset.less`引入。

## 快速上手

使用Vue的`vue-cli`工具和Vux提供的`vuxjs/webpack`可以快速创建一个基于Vux的移动端项目。

`vuxjs/webpack`帮你做了以下几件事：

- 配置`vue-loader`
- 配置`babel-loader`以正确编译Vux的js源码
- 添加`less` `less-loader`以正确编译less源码
- 添加viewport meta
- 添加`Fastclick`移除移动端点击延迟
- 添加`vue-router`
- 引入Vux的`reset.less`样式
- 添加webpack plugin, 在构建后去除重复css代码

``` bash
# install vue-cli
npm install -g vue-cli

# init a webpack project with vuxjs/template
vue init vuxjs/webpack my-project
cd my-project
# or cnpm install
npm install
npm run dev
```

## vue-cli手动引入

如果使用Vue提供的`webpack`模板，请参照`vuxjs/webpack`模板按需要处理。
其中为Vux js源码添加`babel-loader`是必须要做的，否则会报错。

###  添加meta

src/index.html

`<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">`

### 引入Fastclick

``` js
// src/main.js
const FastClick = require('fastclick')
FastClick.attach(document.body)
```

### 安装添加less less-loader

``` bash
npm install less less-loader --save-dev
```

### 添加babel loader

在`build/webpack.base.conf.js`里引入`vux-loader`

```
var vuxLoader = require('vux-loader')
var projectRoot = path.resolve(__dirname, '../')
```

添加loader

``` js
loaders:[
  vuxLoader.getBabelLoader(projectRoot)
]
```

###  引入reset.less

``` html
<!--src/App.vue-->
<style lang="less">
@import '~vux/src/styles/reset';
</style>
```

### 使用Vux模块

``` js
import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'

export default {
  components: {
  	Group,
    Cell
  }
}
```



## hard模式：不推荐的umd方式

可以列出88个理由来说明为什么不推荐umd方式，但是对于一些历史项目重构成.vue文件也不大现实。因此在前面的版本，Vux同样生成了每个组件的umd文件方便引入。

你需要的做的事情是:

- 引入`dist/styles/reset.css` 样式
- 引入Vue js
- 引入需要的组件js
- 注册组件
- 引入需要的组件css
- 上线前合并压缩这些组件js和css

不建议你做的是：

- 引入 `dist/vux.css`, 该样式是所有组件的样式，仅用于测试
- 在新项目还使用umd文件

[zh-CN]
