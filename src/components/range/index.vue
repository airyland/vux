<template>
  <div class="vuee-range-input-box" style="width:180px;position:relative;margin-right:20px;">
    <input class="vuee-range-input" v-model="value">
  </div>
</template>

<script>
  const Powerange = require('./powerange')
  export default {
    props: {
      decimal: {
        type: Boolean,
        default: false
      },
      value: {
        default: 0,
        twoWay: true
      },
      min: {
        default: 0
      },
      max: {
        default: 100
      },
      step: {
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      },
      disabled_opacity: {
        default: 0.75
      },
      range_bar_height: {
        type: Number,
        default: 1
      },
      range_handle_height: {
        type: Number,
        default: 30
      }
    },
    ready () {
      const _this = this
      let options = {
        decimal: _this.decimal,
        start: _this.value,
        min: _this.min,
        max: _this.max,
        disable: _this.disabled,
        disabledOpacity: _this.disabled_opacity,
        callback: function () {

        }
      }
      if (_this.step !== 0) {
        options.step = _this.step
      }
      this.range = new Powerange(this.$el.querySelector('.vuee-range-input'), options)
      const handleTop = (this.range_handle_height - this.range_bar_height) / 2
      this.$el.querySelector('.range-handle').style.top = `-${handleTop}px`
      this.$el.querySelector('.range-bar').style.height = `${this.range_bar_height}px`
    },
    beforeDestroy () {
      // @todo
    }
  }
</script>

<style>
@import './powerange.css'
</style>