---
title: 纯 css close 图标
---

# 纯 css close 图标

::: tip
关闭图标主要应用于弹窗(dialog)关闭按钮以及弹窗(popup)头部的关闭按钮。
:::

## 使用

在你项目的`App.vue`引入，组件内不需要再重复引入。

``` html
<style lang="less">
@import '~vux/src/styles/close.less';
</style>
```

## 类名

- `vux-close`


``` html
<span class="vux-close"></span>
```

可以参考 `XDialog` 演示。

## 颜色

当你想设置图标颜色时，直接设置 color 即可。


``` html
<span class="vux-close" style="color:red;"></span>
```


