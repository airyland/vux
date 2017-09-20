<template>
  <div class="vux-checker-item" :class="classNames" @click="select">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'checker-item',
  props: {
    value: {
      type: [String, Number, Object],
      required: true
    },
    disabled: Boolean
  },
  watch: {
    disabled (val) {
      if (val && this.$parent.type === 'radio' && this.value === this.$parent.currentValue) {
        this.$parent.currentValue = ''
      }
    }
  },
  computed: {
    classNames () {
      const isSimpleValue = typeof this.value === 'string' || typeof this.value === 'number'
      const names = {
        'vux-tap-active': !this.disabled
      }

      if (this.$parent.defaultItemClass) {
        names[this.$parent.defaultItemClass] = true
      }

      if (this.$parent.selectedItemClass) {
        let selected = false
        if (this.$parent.type === 'radio') {
          if (isSimpleValue && this.$parent.currentValue === this.value) {
            selected = true
          } else if (typeof this.value === 'object' && isEqual(this.$parent.currentValue, this.value)) {
            selected = true
          }
        } else {
          if (typeof this.value === 'string') {
            if (this.$parent.currentValue.indexOf(this.value) > -1) {
              selected = true
            }
          } else if (this.$parent.currentValue && this.$parent.currentValue.length) {
            const match = this.$parent.currentValue.filter(one => {
              return isEqual(one, this.value)
            })
            selected = match.length > 0
          }
        }
        names[this.$parent.selectedItemClass] = selected
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
        if (this.$parent.currentValue === this.value) {
          if (!this.$parent.radioRequired) {
            this.$parent.currentValue = ''
          }
        } else {
          this.$parent.currentValue = this.value
        }
      }
      this.$emit('on-item-click', this.value, this.disabled)
    },
    selectCheckbox () {
      if (!this.$parent.currentValue || this.$parent.currentValue === null) {
        this.$parent.currentValue = []
      }
      const isSimpleValue = typeof this.value === 'string' || typeof this.value === 'number'
      if (!this.disabled) {
        let index = -1
        if (isSimpleValue) {
          index = this.$parent.currentValue.indexOf(this.value)
        } else {
          index = this.$parent.currentValue.map(one => JSON.stringify(one)).indexOf(JSON.stringify(this.value))
        }
        if (index > -1) {
          this.$parent.currentValue.splice(index, 1)
        } else {
          if (!this.$parent.max || (this.$parent.max && (this.$parent.currentValue !== null && this.$parent.currentValue.length < this.$parent.max))) {
            if (!this.$parent.currentValue || !this.$parent.currentValue.length) {
              this.$parent.currentValue = []
            }
            this.$parent.currentValue.push(this.value)
          }
        }
      }
      this.$emit('on-item-click', this.value, this.disabled)
    }
  }
}

function isEqual (obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}
</script>

<style lang="less">
@import '../../styles/tap.less';
</style>
