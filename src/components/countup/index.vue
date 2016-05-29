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
    startVal: {
      type: Number,
      default: 0
    },
    endVal: {
      type: Number,
      required: true
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
      default () {
        return {}
      }
    }
  }
}
</script>
