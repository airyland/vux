<template>
  <button class="weui_btn" :class="{'weui_btn_disabled':disabled, 'weui_btn_mini': mini, 'weui_btn_primary':type==='primary', 'weui_btn_warn':type==='warn', 'weui_btn_default':type==='default'}" :disabled="disabled">
    {{text}}<slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      required: false,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    mini: {
      type: Boolean,
      required: false,
      default: false
    },
    text: {
      type: String,
      required: false
    }
  }
}
</script>

<style>
</style>
