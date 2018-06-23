---
title: umd 组件构建及使用
---

# umd 组件构建及使用

  ::: tip
  从`2.0`开始，推荐使用`webpack`来调用组件，因此不再在`repo`中保存`umd`文件，但提供了生成命令。

  请更新 `NodeJS` 到版本 `7.6.0`及以上。

  例子可查看：[https://github.com/airyland/vux/tree/v2/docs/examples](https://github.com/airyland/vux/tree/v2/docs/examples)
  :::

  ::: danger
  强烈建议使用 `webpack` 的方式开发，在 3.0 之后可能不再提供支持。
  :::

  ## 生成命令

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

  ## 目录结构

  生成的文件夹结构如：

  ::: tip
  出于目录结构一致性考虑，即使是子组件也是一个文件夹，并且会有一个空的`index.min.css`样式文件。
  :::

  ```
  |- dist/
    |- vux.min.js ------------ 所有组件打包，仅用于测试，不推荐在生产环境使用
    |- vux.min.css ----------- 所有组件样式打包，同样仅用于测试
    |- components
        |- actionsheet
          |- index.min.js -------- 组件js代码
          |- index.min.css ------- 组件css代码
  ```

  ::: tip
  vux.min.js 包括了所有的组件、插件及默认地址库，都挂载在全局变量vux上。当然为了使用方便同样直接挂载到了`window`上。

  组件调用举例: `vuxCell`

  插件调用举例：`vuxAlertPlugin`

  默认地址库调用：`vuxChinaAddressData`
  :::

  ## 组件使用

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

## 插件使用


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

## 生成css工具样式

包括`1px`解决方案，构建文件位于`dist/styles/*.css`,构建方式：

``` bash
npm run build-styles
```

::: tip
为了使用方便，可以使用`npm run xbuild`来执行`build-components` 及 `build-styles`
:::