<template>
  <div class="weui-cells__title">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'group-title'
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_cell/weui_access';
@import '../../styles/weui/widget/weui_cell/weui_cell_global';
</style>