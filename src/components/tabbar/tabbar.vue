<template>
  <div class="weui-tabbar">
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
@import '../../styles/weui/widget/weui_tab/vux-tabbar.less';
@import '../../styles/reddot.less';

.weui-tabbar__icon {
  position: relative;
}
.weui-tabbar__icon > sup {
  position: absolute;
  top: -8px;
  left: 100%;
  transform: translateX(-50%);
  z-index: 101;
}
.weui-tabbar__item.vux-tabbar-simple {
  padding: 0;
  height: 50px;
  line-height: 50px;
}
.vux-tabbar-simple .weui-tabbar__label {
  font-size: 14px;
  line-height: 50px;
}
</style>
