---
title: 升级到 vux@2.x
---

# 升级到 vux@2.x

### Vue@2.x 主要变更

参考[Vue官方文档](https://cn.vuejs.org/v2/guide/migration.html)进行迁移, 这也是Vux组件的代码更新部分，主要包括：

- `:value.sync` 已经废弃
- `broadcast` 方法已经废弃
- `@click` 需要更改为 `@click.native`
- `v-for`的`(index, item)` => `(item, index)`

### vue-router 更新

配合vue2, `vue-router`同样需要更新到2.0版本以上

原来的路由配置修改为：

``` js

const routes = [{
  path: '/vux/2.0',
  component: Vux2Demo
}]

const router = new VueRouter({
  routes
})

```

原来的路由挂载修改为：

``` js
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

`go` 已经不是过去的 `go`了，要用`push`方法来跳转

``` js
this.$router.go('/somewhere')
```

`v-link`也废弃了，使用`router-link`组件来代替

其他请参考官方升级文档: [https://cn.vuejs.org/v2/guide/migration-vue-router.html](https://cn.vuejs.org/v2/guide/migration-vue-router.html)


### 不再生成`umd`文件

但是你可以使用`npm run build-components`来生成，请参考文档首页。

### 双向绑定修改为 `v-model`

所有相关Vux调用的 `:value.sync`都需要更改成 `v-model`

``` js
// 0.x
<component :value.sync="someValue"></component>
// 2.x
<component v-model="someValue"></component>
```

### 使用 vux-loader

原来你可能在webpack中做了这样的配置以正确编译vux的js源码：

``` js
{
  test: /vux.src.*?js$/,
  loader: 'babel'
}
```

或者你也可能使用了低版本`vux-loader`的`getBabelLoader`方法。

现在你可以直接删除这一句了，直接使用vux-loader。

在`webpack.base.conf.js`中这样配置：

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

### 引入方式变更

原来你可能是单个组件引入，现在在`vux-loader`的支持下你可以直接这样写：

``` js
import { Group, Cell } from 'vux'
```


### 组件名字变更

<p class="tip">
  为什么不参照其他组件库全部加上`X`前缀，主要是因为觉得总要写个`X`相当不顺手。
</p>

因Vue2.0限制组件名不能与原有的html5标签一样，因此部分组件进行了重命名，加上 `x-`前缀，所有需要加前缀的组件如下：

- `Progress` => `XProgress`
- `Switch` => `XSwitch`
- `Dialog` => `XDialog`
- `Address` => `XAddress`
- `Circle` => `XCircle`
- `XButton`
- `XImg`
- `XInput`
- `XTextarea`
- `XHeader`

### 各个组件变更：

#### Swiper 引入路径变化

目录结构变化，与其他有子组件的统一，导致引入方式变化：

``` js
// 0.x
import Swiper from 'vux/src/components/swiper'
import SwiperItem from 'vux/src/components/swiper-item'
// 2.0
import Swiper from 'vux/src/components/swiper/swiper'
import SwiperItem from 'vux/src/components/swiper/swiper-item'
// 或者
import { Swiper, SwiperItem } from 'vux/src/components/swiper' // with vux-loader
```

#### ColorPicker 废弃

<p class="tip">
  `2.0.0`可用用，但是后面不再维护。
</p>

这个组件可以由`cell`配合`slot`扩展出来，而且更灵活。没有做过统计，但是感觉使用人数应该挺少。

#### Countdown 废弃

<p class="tip">
  `2.0.0`可用，但是后面不再维护。
</p>

功能薄弱，比较鸡肋。

#### Scroller reset方法更新

由于 Vue@2.x 的`broadcast`方法已经废弃，并且之前的设计也并不是很好，uuid的绑定也其实是没必要的。

- reset方法变成使用ref的`reset()`方法
- pullup reset 变成 ref 的 `donePullup()`方法
- pullup disable 变成 ref 的 `disablePullup()`方法
- pullup enable 变成 ref 的 `enablePullup()`方法
- pulldown reset 变成 ref 的 `donePulldown()`方法
- pullup和pulldown的status绑定变成`v-model="status"`绑定，示例

  ``` js
  status: {
    pullupStatus: 'default',
    pulldownStatus: 'default'
  }
  ```

详细参照<a href="#" router-link="/zh-CN/components?id=scroller">Scroller文档</a>进行更新

#### 表单默认required为true

保持和`html`规范一致, 影响的组件有 `XInput` `Checklist`

#### Checklist 不显示错误提示

考虑到错误样式目前并不优雅，而用户有自定义错误样式的需要，因此处理成emit一个错误事件+底部slot， 用户可自行处理。

#### XInput 的valid获取

由于Vue2的$ref不再是响应的，因此不能直接在模板中通过ref调用组件的valid值(会报undefined)，所以需要变成在提交时再进行ref来获取valid值。

#### XAddress 默认地址数据更新

目前引用方式：

``` js
import { XAddress, ChinaAddressData } from 'vux'
```

如果你想继续使用旧版本数据

``` js
import { XAddress, ChinaAddressV1Data } from 'vux'
```

按照[最新统计局数据](http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/201608/t20160809_1386477.html)进行更新，部分区域已经不存在，部分id做了更新。因此请*谨慎*更新，评估后端数据存储设计和前端交互再进行更新，避免错误更新用户数据或者导致数据丢失。

完整更新如下图:

<p align="center">
  <img src="https://github.com/airyland/china-area-data/raw/master/v2.0.0.changes.png" alt="">
</p>
