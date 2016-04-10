<template>
  <span class="spinner" :class="className"></span>
</template>

<script>
import Spinner from './spinner'
const types = ['android', 'ios', 'ios-small', 'bubbles', 'circles', 'crescent', 'dots', 'lines', 'ripple', 'spiral']
export default {
  ready () {
    Spinner(this.$el, this.type)
  },
  props: {
    type: {
      type: String,
      default: 'ios'
    }
  },
  computed: {
    className: function () {
      let rs = {}
      for (let i = 0; i < types.length; i++) {
        rs[`spinner-${types[i]}`] = this.type === types[i]
      }
      return rs
    }
  }
}
</script>

<style>
.spinner {
  stroke: #444;
  fill: #444;
  vertical-align: middle;
  display: inline-block;
  width: 28px;
  height: 28px;
}

.spinner svg {
  width: 28px;
  height: 28px;
}

.spinner.spinner-inverse {
  stroke: #fff;
  fill: #fff;
}

.spinner-android {
  stroke: #4b8bf4;
}

.spinner-ios, .spinner-ios-small {
  stroke: #69717d;
}

.spinner-spiral .stop1 {
  stop-color: #fff;
  stop-opacity: 0;
}

.spinner-spiral.spinner-inverse .stop1 {
  stop-color: #000;
}

.spinner-spiral.spinner-inverse .stop2 {
  stop-color: #fff;
}
</style>
