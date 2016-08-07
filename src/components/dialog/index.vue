<template>
  <div class="weui_dialog_alert" @touchmove="!this.scroll && $event.preventDefault()">
    <div class="weui_mask" @click="hideOnBlur && (show = false)" v-show="show" :transition="maskTransition"></div>
    <div class="weui_dialog" v-show="show" :transition="dialogTransition">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: 'vux-fade'
    },
    dialogTransition: {
      type: String,
      default: 'vux-dialog'
    },
    hideOnBlur: Boolean,
    scroll: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    show (val) {
      this.$emit(val ? 'on-show' : 'on-hide')
    }
  }
}
</script>

<style lang="less">
@import '../../styles/transition.less';
@import '../../styles/weui/widget/weui_tips/weui_mask';
@import '../../styles/weui/widget/weui_tips/weui_dialog';
</style>
