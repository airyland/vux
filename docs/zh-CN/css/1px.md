---
title: 1px 解决方案
---

# 1px 解决方案

::: tip
1px 方案在 VUX 组件内应用广泛，包括 `Grid`, `ButtonTab`, `XTable`, `XButton`, `Cell` 等等。

利用 `Flexbox` + `1px` 你可以实现复杂的宫格布局。
:::

## 引入

在你项目的`App.vue`引入，组件内不需要再重复引入。

``` html
<style lang="less">
@import '~vux/src/styles/1px.less';
</style>
```

## 可用类名：

- `vux-1px-l` 左边框
- `vux-1px-r` 右边框
- `vux-1px-t` 上边框
- `vux-1px-b` 下边框
- `vux-1px-tb` 上下边框
- `vux-1px` 全边框


