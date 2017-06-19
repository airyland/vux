<template>
  <div>
    <popup-picker :data="list" :title="title" :display-format="cellFormat" v-model="currentValue" :inline-desc="inlineDesc" :placeholder="placeholder" @on-hide="emitHide" @on-show="$emit('on-show')" :value-text-align="valueTextAlign" :column-width="[1/2, 1/6]"></popup-picker>
  </div>
</template>

<script>
import value2name from '../../filters/value2name'
import PopupPicker from '../popup-picker'
import getDateRange from '../../tools/date/range'
import getNumberRange from '../../tools/number/range'

export default {
  name: 'datetime-range',
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
    startDate: String,
    endDate: String,
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    rawValue: Boolean,
    inlineDesc: String,
    placeholder: String,
    hideDistrict: Boolean,
    valueTextAlign: String
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
      currentValue: this.value,
      cellFormat (val) {
        return val[0] + ' ' + val[1] + ':' + val[2]
      }
    }
  },
  computed: {
    list () {
      if (!this.startDate || !this.endDate) {
        return []
      }
      const datesNames = getDateRange(this.startDate, this.endDate, this.format)
      const datesValues = getDateRange(this.startDate, this.endDate, 'YYYY-MM-DD')
      const hours = getNumberRange(0, 23)
      const minutes = getNumberRange(0, 59)
      return [datesNames.map((one, index) => {
        return {
          name: one,
          value: datesValues[index]
        }
      }), hours, minutes]
    },
    nameValue () {
      return value2name(this.currentValue, this.list)
    }
  },
  watch: {
    currentValue (val) {
      this.$emit('on-change', val)
      this.$emit('input', val)
    },
    value (val) {
      this.currentValue = val
    }
  }
}
</script>
