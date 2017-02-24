<template>
  <button class="weui-btn" :class="classes" :disabled="disabled" :type="actionType">
    <i class="weui-loading" v-if="showLoading"></i><slot>{{text}}</slot>
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
    showLoading: Boolean
  },
  computed: {
    classes () {
      return [
        {
          'weui-btn_disabled': this.disabled,
          'weui-btn_mini': this.mini
        },
        `weui-btn_${this.type}`,
        this.plain ? `weui-btn_plain-${this.type}` : '',
        this.showLoading ? `weui-btn_loading` : ''
      ]
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui-button/weui-button.less';
@import '../../styles/weui/widget/weui-loading/weui-loading.less';
</style>
