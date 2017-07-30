<template>
  <div class="vux-cell-box weui-cell" :class="{'vux-tap-active': isLink || !!link, 'weui-cell_access': isLink || !!link, 'vux-cell-no-border-intent': !borderIntent}" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
import { go } from '../../libs/router'

export default {
  name: 'cell-box',
  props: {
    isLink: Boolean,
    link: [String, Object],
    borderIntent: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onClick () {
      this.link && go(this.link, this.$router)
    }
  }
}
</script>

<style lang="less">
@import '../../styles/variable.less';
@import '../../styles/tap.less';
@import '../../styles/weui/base/mixin/setArrow.less';
@import '../../styles/weui/widget/weui_cell/weui_cell_global';

.vux-cell-primary {
  flex: 1;
}
.weui-cell.vux-cell-no-border-intent:before {
  left: 0;
}
</style>
