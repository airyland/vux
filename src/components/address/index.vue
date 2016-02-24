<template>
  <popup-picker :columns=3 :data="list" :title="title" :value.sync="value" show-name></popup-picker>
</template>

<script>
const list = require('./list.json')
import name2value from '../../filters/name2value'
import PopupPicker from '../Popup-picker'
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
    }
  },
  beforeCompile () {
    if (this.value.length && this.rawValue) {
      this.value = name2value(this.value, list).split(' ')
    }
  },
  data () {
    return {
      list: list
    }
  }
}
</script>

<style>
  
</style>