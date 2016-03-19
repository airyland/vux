<template>
  <span>{{startVal}}</span>
</template>

<script>
import Countup from 'countup'
export default {
  ready () {
    this._countup = new Countup(this.$el, this.startVal, this.endVal, this.decimals, this.duration, this.options)
    this._countup.start()
  },
  props: {
    // float or integer
    startVal: {
      validator: function (val) {
        return val % 1 === 0
      },
      coerce: function (val) {
        return val * 1
      },
      default: 0
    },
    // float or integer
    endVal: {
      validator: function (val) {
        return val % 1 === 0
      },
      coerce: function (val) {
        return val * 1
      }
    },
    // number of decimal places in number
    decimals: {
      type: Number,
      default: 0
    },
    // duration in seconds
    duration: {
      type: Number,
      default: 2
    },
    options: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  beforeDestroy () {

  }
}
</script>