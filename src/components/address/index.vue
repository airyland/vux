<template>
  <popup-picker :columns="hideDistrict ? 2 : 3" :data="list" :title="title" :value.sync="value" show-name :inline-desc="inlineDesc" :placeholder="placeholder"></popup-picker>
</template>

<script>
import name2value from '../../filters/name2value'
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
    rawValue: {
      type: Boolean,
      default: false
    },
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
  }
}
</script>
