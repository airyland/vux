---
title: Vue 打包优化：使用 inline manifest
---

# inline manifest

::: tip
`manifest` 文件为路径配置和异步组件名字列表，该做法可以减少一个`http`请求。

确保 `vux-loader`更新到 `^1.0.35`。
:::


## 修改 index.html 模板

首先在页面的`</body>`前加入代码：

``` html
<%=htmlWebpackPlugin.files.webpackManifest%>
```

## 配置 vux-loader

在`vux-loader`配置的 `plugins` 列表中加入`inline-manifest`插件

``` js
plugins:[{
  name: 'inline-manifest'
}]
```

或者简化写法直接使用名字：

``` js
plugins:['inline-manifest']
```