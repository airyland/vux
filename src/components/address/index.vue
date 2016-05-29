<template>
  <popup-picker :columns=3 :data="list" :title="title" :value.sync="value" show-name :inline-desc="inlineDesc"></popup-picker>
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
      twoWay: true,
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
    inlineDesc: String
  },
  beforeCompile () {
    if (this.value.length && this.rawValue) {
      this.value = name2value(this.value, this.list).split(' ')
    }
  }
}
</script>
