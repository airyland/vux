<template>
  <span>{{time}}</span>
</template>

<script>
export default {
  props: {
    time: {
      type: Number,
      default: 60
    },
    start: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    tick: function () {
      let _this = this
      this.interval = setInterval(function () {
        if (_this.time > 0) {
          _this.time--
        } else {
          _this.stop()
          _this.index++
          _this.$dispatch('on-finish', _this.index)
        }
      }, 1000)
    },
    stop: function () {
      clearInterval(this.interval)
    }
  },
  watch: {
    start: function (newVal, oldVal) {
      if (newVal === true && oldVal === false && this.time > 0) {
        this.tick()
      }
      if (newVal === false && oldVal === true) {
        this.stop()
      }
    }
  },
  ready () {
    if (this.start) {
      this.tick()
    }
  },
  data () {
    return {
      interval: null,
      index: 0
    }
  }
}
</script>