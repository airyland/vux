<template>
  <button class="weui_btn" :class="classes" :disabled="btnDisabled" :type="actionType">
    <i class="weui-loading" v-show="showLoading"></i>
    {{text}}<slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      default: 'default'
    },
    disabled: Boolean,
    mini: Boolean,
    plain: Boolean,
    text: String,
    actionType: String,
    showLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      return [
        {
          weui_btn_disabled: this.btnDisabled,
          weui_btn_mini: this.mini,
          weui_btn_loading: this.showLoading
        },
        `weui_btn_${this.type}`,
        this.plain ? `weui_btn_plain_${this.type}` : ''
      ]
    },
    btnDisabled () {
      return this.showLoading ? true : this.disabled
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_button/weui_button.less';
</style>
