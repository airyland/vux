<template>
  <span>{{startVal}}</span>
</template>

<script>
import Countup from 'countup'

const coerce2Number = function (defaultNumber) {
  return function (val) {
    return val ? val * 1 : defaultNumber
  }
}

export default {
  ready () {
    this._countup = new Countup(this.$el, this.startVal, this.endVal, this.decimals, this.duration, this.options)
    this._countup.start()
  },
  props: {
    startVal: {
      type: Number,
      coerce: coerce2Number(0),
      default: 0
    },
    endVal: {
      type: Number,
      coerce: function (val) {
        return val * 1
      }
    },
    // number of decimal places in number
    decimals: {
      type: Number,
      coerce: coerce2Number(0),
      default: 0
    },
    // duration in seconds
    duration: {
      type: Number,
      coerce: coerce2Number(2),
      default: 2
    },
    options: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>