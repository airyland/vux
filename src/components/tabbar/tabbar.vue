<template>
  <div class="weui_tabbar">
    <slot></slot>
  </div>
</template>

<script>
import { parentMixin } from '../../mixins/multi-items'

export default {
  mixins: [parentMixin],
  props: {
    iconClass: String
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_tab/weui_tab_tabbar';
.weui_tabbar_icon {
  position: relative;
}
.weui_tabbar_icon > sup {
  position: absolute;
  top: -8px;
  left: 100%;
  transform: translateX(-50%);
  z-index: 101;
}
</style>
