---
title: Vue + webpack 区分测试环境和生产环境
---

# 区分测试环境和生产环境

如果你使用了 `vux2` 模板或者 `webpack` 模板，默认你可以直接通过判断 `process.env.NODE_ENV` 来区分

比如`统计代码`仅放在 `production` 环境，在不同环境里使用不同的 `API` 接口地址。

``` js
if (process.env.NODE_ENV === 'production') {
  // 干一些线上才要做的事情
}
if (process.env.NODE_ENV === 'development') {
  // 干一些测试时不可告人的事情
}
```

如果你是自己配置的环境，可以参考 [webpack DefinePlugin 文档](https://webpack.js.org/plugins/define-plugin/)