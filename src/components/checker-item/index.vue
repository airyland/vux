<template>
  <div class="vux-checker-item" :class="classNames" @click="select">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classNames () {
      const names = {
        'vux-tap-active': !this.disabled
      }
      if (this.$parent.defaultItemClass) {
        names[this.$parent.defaultItemClass] = true
      }
      if (this.$parent.selectedItemClass) {
        names[this.$parent.selectedItemClass] = this.$parent.value === this.value
      }
      if (this.$parent.disabledItemClass) {
        names[this.$parent.disabledItemClass] = this.disabled
      }
      return names
    }
  },
  methods: {
    select () {
      if (!this.disabled) {
        this.$parent.$set('value', this.value)
        this.$emit('on-item-click', this.value, this.disabled)
      }
    }
  }
}
</script>