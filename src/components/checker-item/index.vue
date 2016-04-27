<template>
  <div class="vux-checker-item" :class="classNames" @click="select">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classNames: function () {
      const names = {}
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
    select: function () {
      if (!this.disabled) {
        this.$parent.$set('value', this.value)
        this.$dispatch('on-item-click', this.value, this.disabled)
      }
    }
  }
}
</script>