<template>
  <div class="vux-checker-box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    defaultItemClass: {
      type: String
    },
    selectedItemClass: {
      type: String
    },
    disabledItemClass: {
      type: String
    },
    value: {
      type: [String, Number],
      twoWay: true
    }
  },
  watch: {
    value: function (newValue) {
      this.$dispatch('on-change', newValue)
    }
  }
}
</script>

<style>
.vux-checker-item {
  display: inline-block;
}
</style>