<template>
  <span class="vux-spinner" :class="className" :style="styles"></span>
</template>

<script>
import Spinner from './spinner'
const types = ['android', 'ios', 'ios-small', 'bubbles', 'circles', 'crescent', 'dots', 'lines', 'ripple', 'spiral']

export default {
  name: 'spinner',
  mounted () {
    this.$nextTick(() => {
      Spinner(this.$el, this.type, this.size)
    })
  },
  props: {
    type: {
      type: String,
      default: 'ios'
    },
    size: String
  },
  computed: {
    styles () {
      if (typeof this.size !== 'undefined' && this.size !== '28px') {
        return {
          width: this.size,
          height: this.size
        }
      }
    },
    className () {
      let rs = {}
      for (let i = 0; i < types.length; i++) {
        rs[`vux-spinner-${types[i]}`] = this.type === types[i]
      }
      return rs
    }
  }
}
</script>

<style>
.vux-spinner {
  stroke: #444;
  fill: #444;
  vertical-align: middle;
  display: inline-block;
  width: 28px;
  height: 28px;
}

.vux-spinner svg {
  width: 28px;
  height: 28px;
}

.vux-spinner.vux-spinner-inverse {
  stroke: #fff;
  fill: #fff;
}

.vux-spinner-android {
  stroke: #4b8bf4;
}

.vux-spinner-ios, .vux-spinner-ios-small {
  stroke: #69717d;
}

.vux-spinner-spiral .stop1 {
  stop-color: #fff;
  stop-opacity: 0;
}

.vux-spinner-spiral.vux-spinner-inverse .stop1 {
  stop-color: #000;
}

.vux-spinner-spiral.vux-spinner-inverse .stop2 {
  stop-color: #fff;
}
</style>
