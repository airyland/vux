<template>
  <button class="vux-swipeout-button" :style="{width: `${width}px`, backgroundColor: backgroundColor}" @click="onButtonClick">
    <slot>{{text}}</slot>
  </button>
</template>

<script>
export default {
  props: {
    text: String,
    backgroundColor: {
      type: String,
      default: '#b6bec0'
    },
    width: {
      type: Number,
      default: 80
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