<template>
  <div class="vux-cell-box weui-cell" :class="{'vux-tap-active': isLink || !!link, 'weui-cell_access': isLink || !!link}" @click="onClick">
    <div><slot></slot></div>
  </div>
</template>

<script>
import { go } from '../../libs/router'

export default {
  props: {
    isLink: Boolean,
    link: [String, Object]
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

.vux-cell-box > div {
  padding-right: 13px;
}
.vux-cell-primary {
  flex: 1;
}
</style>
