<template>
  <div class="weui-grids">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'grid',
  props: {
    rows: {
      type: Number,
      default: 3
    }
  }
}
</script>
<style lang="less">
@import '../../styles/weui/widget/weui-grid/weui-grid.less';
</style>
