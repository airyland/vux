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
    disabled: Boolean
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
        names[this.$parent.selectedItemClass] = this.$parent.type === 'radio' ? (this.$parent.value === this.value) : (this.$parent.value.indexOf(this.value) > -1)
      }
      if (this.$parent.disabledItemClass) {
        names[this.$parent.disabledItemClass] = this.disabled
      }
      return names
    }
  },
  methods: {
    select () {
      if (this.$parent.type === 'radio') {
        this.selectRadio()
      } else {
        this.selectCheckbox()
      }
    },
    selectRadio () {
      if (!this.disabled) {
        this.$parent.$set('value', this.value)
        this.$emit('on-item-click', this.value, this.disabled)
      }
    },
    selectCheckbox () {
      if (!this.disabled) {
        const index = this.$parent.value.indexOf(this.value)
        if (index > -1) {
          this.$parent.value.splice(index, 1)
        } else {
          if (!this.$parent.max || (this.$parent.max && this.$parent.value.length < this.$parent.max)) {
            this.$parent.value.push(this.value)
          }
        }
        this.$emit('on-item-click', this.value, this.disabled)
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/tap.less';
</style>
