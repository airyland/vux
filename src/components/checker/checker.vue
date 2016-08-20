<template>
  <div class="vux-checker-box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    defaultItemClass: String,
    selectedItemClass: String,
    disabledItemClass: String,
    type: {
      type: String,
      default: 'radio'
    },
    value: [String, Number, Array],
    max: Number
  },
  watch: {
    value (newValue) {
      this.$emit('on-change', newValue)
    }
  }
}
</script>

<style>
.vux-checker-item {
  display: inline-block;
}
</style>
