<template>
  <button class="weui_btn" :class="classes" :disabled="disabled">
    {{text}}<slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    mini: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    text: String
  },
  computed: {
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
  }
}
</script>
