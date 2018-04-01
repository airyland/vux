---
nav: zh-CN
---

## 1px

::: tip
1px 方案在 VUX 组件内应用广泛，包括 Grid, ButtonTab, XTable, XButton, Cell 等等。
<br>
<br>
利用 flexbox + 1px 你可以实现复杂的宫格布局。
:::

在你项目的`App.vue`引入，组件内不需要再重复引入。

``` html
<style lang="less">
@import '~vux/src/styles/1px.less';
</style>
```

可用类名：

- `vux-1px-l` 左边框
- `vux-1px-r` 右边框
- `vux-1px-t` 上边框
- `vux-1px-b` 下边框
- `vux-1px-tb` 上下边框
- `vux-1px` 全边框



## close

::: tip
关闭图标主要应用于弹窗(popup)的左侧关闭按钮。
:::

在你项目的`App.vue`引入，组件内不需要再重复引入。

``` html
<style lang="less">
@import '~vux/src/styles/close.less';
</style>
```

可用类名：

- vux-close


``` html
<span class="vux-close"></span>
```

可以参考 `XDialog` 演示。

当你想设置图标颜色时，直接设置 color 即可。


``` html
<span class="vux-close" style="color:red;"></span>
```


