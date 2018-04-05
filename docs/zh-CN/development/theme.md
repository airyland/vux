---
title: 主题颜色配置
---

# 主题颜色配置

## 配置插件

::: warning
暂时只支持配合`vux-loader`使用。

注意的是主题文件不能引入其他less文件，只能为简单变量列表。
:::

请配置vux-loader的`less-theme`插件，指定用以覆盖的less文件路径：

``` js
{
  name: 'less-theme',
  path: 'src/styles/theme.less' // 相对项目根目录路径
}
```

## 可配置颜色

源码地址：<a href="https://github.com/airyland/vux/blob/v2/src/styles/variable.less">https://github.com/airyland/vux/blob/v2/src/styles/variable.less</a>

::: tip
更多配置需求请通过 issue 提出。
:::

## demo站点的示例配置

源代码地址：[https://github.com/airyland/vux/blob/v2/src/theme.less](https://github.com/airyland/vux/blob/v2/src/theme.less)

## 内部如何实现的？

`vux-loader` 在每个 `less` 文件的编译过程中重写了 `less-loader` 的变量参数，使其能直接覆盖原来变量。