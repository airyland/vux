<template>
  <div
    class="vux-tab-item"
    :class="[currentSelected ? activeClass : '', {'vux-tab-selected': currentSelected, 'vux-tab-disabled': disabled}]"
    :style="style"
    @click="onItemClick">
    <slot></slot>
    <span
      :style="{background: badgeBackground, color: badgeColor}"
      class="vux-tab-item-badge"
      v-if="typeof badgeLabel !== 'undefined' && badgeLabel !== ''">
    {{ badgeLabel }}</span>
  </div>
</template>

<script>
import { childMixin } from '../../mixins/multi-items'

export default {
  name: 'tab-item',
  mixins: [childMixin],
  props: {
    activeClass: String,
    disabled: Boolean,
    badgeBackground: {
      type: String,
      default: '#f74c31'
    },
    badgeColor: {
      type: String,
      default: '#fff'
    },
    badgeLabel: String
  },
  computed: {
    style () {
      return {
        borderWidth: this.$parent.lineWidth + 'px',
        borderColor: this.$parent.activeColor,
        color: this.currentSelected ? this.$parent.activeColor : this.disabled ? this.$parent.disabledColor : this.$parent.defaultColor,
        border: this.$parent.animate ? 'none' : 'auto'
      }
    }
  }
}
</script>
