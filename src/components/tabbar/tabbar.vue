<template>
  <div class="weui_tabbar">
    <slot></slot>
  </div>
</template>

<script>
import { parentMixin } from '../../mixins/multi-items'

export default {
  mixins: [parentMixin]
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_tab/weui_tab_tabbar';
</style>