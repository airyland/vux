---
title: VUX 打包体积过大
---

# VUX 打包体积过大

一般是以下原因导致的：

## import 语法使用问题

在 `vux-loader@1.0.61` 以下版本，如果你在 `import` 和 `{` 之前没有空格，将不会被解析成按需引入的，比如：

``` js
import{Group, Cell} from 'vux'
```

如果是这一情况，纠正或者升级到 vux-loader >= 1.0.61 可解决。

::: tip
建议开启 `eslint` 来避免这一情况，即使 `vux-loader` 支持，更严格的编码规范利于开发维护。
:::

## 没有正确配置 vux-loader

参照文档配置或者使用 `airyland/vux2` 模板。

## 不标准的写法

vux-loader 基于代码文本替换实现按需引入，可能有部分奇怪的写法导致不能正确解析。可以建个 repo 联系作者解决。

同时强烈推荐开启 eslint 保证编码质量。

## 注释里有 import 语句

在 `vux-loader@1.0.67` 以下版本，如果存在单行注释里有从 VUX 引入组件会导致出现问题。请升级到最新。