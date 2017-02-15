<template>
  <div>
    <popup-picker :fixed-columns="hideDistrict ? 2 : 0" :columns="3" :data="list" :title="title" v-model="currentValue" show-name :inline-desc="inlineDesc" :placeholder="placeholder" @on-hide="emitHide" @on-show="$emit('on-show')" :value-text-align="valueTextAlign"></popup-picker>
  </div>
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
    hideDistrict: Boolean,
    valueTextAlign: String
  },
  created () {
    if (this.currentValue.length && this.rawValue) {
      const parsedVal = name2value(this.currentValue, this.list)
      if (/__/.test(parsedVal)) {
        console.error('Vux: Wrong address value', this.currentValue)
        this.currentValue = []
      } else {
        this.currentValue = parsedVal.split(' ')
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
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  computed: {
    nameValue () {
      return value2name(this.currentValue, this.list)
    }
  },
  watch: {
    currentValue (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.currentValue = val
    }
  }
}
</script>
