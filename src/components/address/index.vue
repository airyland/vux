<template>
  <popup-picker :fixed-columns="hideDistrict ? 2 : 0" :columns="3" :data="list" :title="title" :value.sync="value" show-name :inline-desc="inlineDesc" :placeholder="placeholder" @on-hide="emitHide" @on-show="$emit('on-show')"></popup-picker>
</template>

<script>
import name2value from '../../filters/name2value'
import value2name from '../../filters/value2name'
import PopupPicker from '../popup-picker'

export default {
  components: {
    PopupPicker
  },
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    rawValue: Boolean,
    list: {
      type: Array,
      required: true
    },
    inlineDesc: String,
    placeholder: String,
    hideDistrict: Boolean
  },
  beforeCompile () {
    if (this.value.length && this.rawValue) {
      const parsedVal = name2value(this.value, this.list)
      if (/__/.test(parsedVal)) {
        console.error('Vux: Wrong address value', this.value)
        this.value = []
      } else {
        this.value = parsedVal.split(' ')
      }
    }
  },
  methods: {
    emitHide (val) {
      this.$emit('on-hide', val)
    },
    getAddressName () {
      return value2name(this.value, this.list)
    }
  }
}
</script>
