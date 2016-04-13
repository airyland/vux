<template>
  <div>{{value}}</div>
</template>

<script>
import Calendar from './calendar.js'
export default {
  ready () {
    const _this = this
    this.calendar = new Calendar({
      trigger: _this.$el,
      hours: _this.hours,
      disablePast: _this.disablePast,
      dateList: _this.dateList
    })
    this.calendar.on('change', function (val) {
      _this.value = val
      _this.$dispatch('on-change', val)
    })
  },
  props: {
    value: {
      type: String,
      required: true,
      twoWay: true
    },
    hours: {
      type: Boolean,
      default: false
    },
    disablePast: {
      type: Boolean,
      default: false
    },
    dateList: {
      type: Array
    }
  }
}
</script>

<style>
@import './calendar.css';
</style>
