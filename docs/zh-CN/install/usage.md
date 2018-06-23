---
title: VUX 调用例子
---

# 调用示例

## .vue文件中调用组件

``` html
<template>
  <div>
    <group>
      <cell title="title" value="value"></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
  }
}
</script>
```

## main.js中调用plugin

``` js
import { AlertPlugin, ToastPlugin } from 'vux'

Vue.use(AlertPlugin)
Vue.use(ToastPlugin)

// 详细使用请参考对应组件文档
```