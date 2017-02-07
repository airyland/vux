<template>
  <component :is="component" class="weui_btn" :class="classes" :disabled="disabled" :href="href">
    {{text}}<slot></slot>
  </component>
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
    href: String
  },
  computed: {
    component () {
      return this.href ? 'Link' : 'Button';
    },
    classes () {
      return [
        {
          weui_btn_disabled: this.disabled,
          weui_btn_mini: this.mini
        },
        `weui_btn_${this.type}`,
        this.plain ? `weui_btn_plain_${this.type}` : ''
      ]
    }
  },
  components: {
    Link: { template: '<a><slot></slot></a>' },
    Button: { template: '<button><slot></slot></button>' }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_button/weui_button.less';
</style>
