<template>
  <div class="vux-alert">
    <x-dialog
    class="weui_dialog_alert"
    v-model="showValue"
    :mask-transition="maskTransition"
    :dialog-transition="dialogTransition"
    @on-hide="$emit('on-hide')"
    @on-show="$emit('on-show')">
      <div class="weui_dialog_hd">
        <strong class="weui_dialog_title">{{title}}</strong>
      </div>
      <div class="weui_dialog_bd"><slot></slot></div>
      <div class="weui_dialog_ft">
        <a href="javascript:;"
        class="weui_btn_dialog primary"
        @click="onHide">{{buttonText || $t('button_text')}}</a>
      </div>
    </x-dialog>
  </div>
</template>

<i18n>
button_text:
  en: OK
  zh-CN: 确定
</i18n>

<script>
import XDialog from '../x-dialog'

export default {
  components: {
    XDialog
  },
  props: {
    value: Boolean,
    title: String,
    buttonText: String,
    maskTransition: {
      type: String,
      default: 'vux-fade'
    },
    dialogTransition: {
      type: String,
      default: 'vux-dialog'
    }
  },
  data () {
    return {
      showValue: this.value
    }
  },
  methods: {
    onHide () {
      this.showValue = false
      this.$emit('input', false)
    }
  },
  watch: {
    value (val) {
      this.showValue = val
    }
  }
}
</script>

<style lang="less">
@import '../../styles/transition.less';
@import '../../styles/weui/widget/weui_tips/weui_mask';
@import '../../styles/weui/widget/weui_tips/weui_dialog';
</style>
