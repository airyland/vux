<template>
  <div>
    <dialog class="weui_dialog_confirm"
    :show="show"
    :mask-transition="maskTransition"
    :dialog-transition="dialogTransition"
    @on-hide="$emit('on-hide')"
    @on-show="$emit('on-show')">
      <div class="weui_dialog_hd"><strong class="weui_dialog_title">{{title}}</strong></div>
      <div class="weui_dialog_bd"><slot></slot></div>
      <div class="weui_dialog_ft">
        <a href="javascript:;" class="weui_btn_dialog default" @click="onCancel">{{cancelText}}</a>
        <a href="javascript:;" class="weui_btn_dialog primary" @click="onConfirm">{{confirmText}}</a>
      </div>
    </dialog>
  </div>
</template>

<script>
import Dialog from '../dialog'

export default {
  components: {
    Dialog
  },
  props: {
    show: Boolean,
    title: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      default: 'confirm'
    },
    cancelText: {
      type: String,
      default: 'cancel'
    },
    maskTransition: {
      type: String,
      default: 'vux-fade'
    },
    dialogTransition: {
      type: String,
      default: 'vux-dialog'
    }
  },
  methods: {
    onConfirm () {
      this.show = false
      this.$emit('on-confirm')
    },
    onCancel () {
      this.show = false
      this.$emit('on-cancel')
    }
  }
}
</script>

<style lang="less">
@import '../../styles/transition.less';
@import '../../styles/weui/widget/weui_tips/weui_mask';
@import '../../styles/weui/widget/weui_tips/weui_dialog';
</style>