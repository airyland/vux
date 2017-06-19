<template>
  <a class="vux-button-tab-item" :class="classes" href="javascript:" :style="style" @click="onItemClick">
    <slot></slot>
  </a>
</template>

<script>
import { childMixin } from '../../mixins/multi-items'

export default {
  name: 'button-tab-item',
  mixins: [childMixin],
  computed: {
    classes () {
      return {
        'vux-button-group-current': this.currentIndex === this.$parent.currentIndex,
        'vux-button-tab-item-first': this.currentIndex === 0,
        'vux-button-tab-item-last': this.currentIndex === this.$parent.$children.length - 1,
        'vux-button-tab-item-middle': this.currentIndex > 0 && this.currentIndex !== this.$parent.$children.length - 1
      }
    },
    style () {
      if (this.$parent.height) {
        return {
          height: `${this.$parent.height}px`,
          lineHeight: `${this.$parent.height}px`
        }
      }
    }
  }
}
</script>
