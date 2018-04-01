---
title: $t is not defined
---

# $t is not defined

一般是两个原因：

## cnpm 导致的问题

如果是直接使用模板后并且使用 `cnpm` 报错，请升级到 `vux-loader@1.0.58`。

该问题出现原因是 `cnpm` 安装后 `node_modules` 里的模块为快捷方式，而 `vux-loader` 之前版本没有考虑到这一特殊情况。

## 未正确配置动态 i18n

demo例子使用`$t`是因为demo启用了`i18n`，如果你没有使用`vuex-i18n`等相关`i18n`插件，请不要在代码中使用`$t`函数
