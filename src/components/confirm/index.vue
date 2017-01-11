<template>
  <div>
    <x-dialog class="weui_dialog_confirm"
    :show="showValue"
    :mask-transition="maskTransition"
    :dialog-transition="dialogTransition"
    @on-hide="$emit('on-hide')"
    @on-show="$emit('on-show')">
      <div class="weui_dialog_hd"><strong class="weui_dialog_title">{{title}}</strong></div>
      <div class="weui_dialog_bd"><slot></slot></div>
      <div class="weui_dialog_ft">
        <a href="javascript:;" class="weui_btn_dialog default" @click="onCancel">{{cancelText || $t('cancel_text')}}</a>
        <a href="javascript:;" class="weui_btn_dialog primary" @click="onConfirm">{{confirmText || $t('confirm_text')}}</a>
      </div>
    </x-dialog>
  </div>
</template>

<i18n>
confirm_text:
  en: confirm
  zh-CN: 确定
cancel_text:
  en: cancel
  zh-CN: 取消
</i18n>

<script>
import XDialog from '../x-dialog'
export default {
  components: {
    XDialog
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    show: Boolean,
    title: {
      type: String,
      required: true
    },
    confirmText: String,
    cancelText: String,
    maskTransition: {
      type: String,
      default: 'vux-fade'
    },
    dialogTransition: {
      type: String,
      default: 'vux-dialog'
    }
  },
  created () {
    this.showValue = this.show
    if(this.value) this.showValue = this.value
  },
  watch: {
    value (val) {
      this.showValue = val
    },
    showValue (val){
      this.$emit('input',val)
    },
    show (val) {
      this.showValue = val
    }
  },
  data (){
    return {
      showValue:false
    }
  },
  methods: {
    onConfirm () {
      this.showValue = false
      this.$emit('on-confirm')
    },
    onCancel () {
      this.showValue = false
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