<template>
  <span>{{startVal}}</span>
</template>

<script>
import Countup from 'countup.js'

export default {
  mounted () {
    this.$nextTick(() => {
      this._countup = new Countup(this.$el, this.startVal, this.endVal, this.decimals, this.duration, this.options)
      if (this.start) {
        this._countup.start()
      }
    })
  },
  props: {
    start: {
      type: Boolean,
      default: true
    },
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
  },
  watch: {
    start (val) {
      if (val) {
        this._countup.start()
      }
    },
    endVal (val) {
      this._countup.update(val)
    }
  }
}
</script>
