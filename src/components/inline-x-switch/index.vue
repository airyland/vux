<template>
  <input
    class="inline-x-switch weui-switch"
    type="checkbox"
    :disabled="disabled"
    v-model="currentValue"/>
</template>

<script>
export default {
  name: 'x-switch',
  methods: {
    toBoolean (val) {
      if (!this.valueMap) {
        return val
      } else {
        const index = this.valueMap.indexOf(val)
        return index === 1
      }
    },
    toRaw (val) {
      if (!this.valueMap) {
        return val
      } else {
        return this.valueMap[val ? 1 : 0]
      }
    }
  },
  props: {
    disabled: Boolean,
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    valueMap: {
      type: Array,
      default: () => ([false, true])
    }
  },
  data () {
    return {
      currentValue: this.toBoolean(this.value)
    }
  },
  watch: {
    currentValue (val) {
      const rawValue = this.toRaw(val)
      this.$emit('input', rawValue)
      this.$emit('on-change', rawValue)
    },
    value (val) {
      this.currentValue = this.toBoolean(val)
    }
  }
}
</script>

<style lang="less">
@import './style.less';
</style>
