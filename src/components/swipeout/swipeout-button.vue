<template>
  <button
    class="vux-swipeout-button"
    :class="{
      'vux-swipeout-button-primary': type === 'primary',
      'vux-swipeout-button-warn': type === 'warn',
      'vux-swipeout-button-default': type === 'default'
      }"
      :style="{
        width: `${width}px`,
        backgroundColor: backgroundColor,
        opacity: disabled ? '0.4' : '1'
      }"
      @click="onButtonClick"
      type="button"
      :disabled="disabled"
    >
    <slot>{{text}}</slot>
  </button>
</template>

<script>
export default {
  name: 'swipeout-button',
  props: {
    text: String,
    backgroundColor: String,
    type: String,
    width: {
      type: Number,
      default: 80
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onButtonClick () {
      if (this.$parent.$options._componentTag === 'swipeout-item') {
        this.$parent.onItemClick(this.text)
      }
    }
  }
}
</script>