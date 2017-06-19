<template>
  <div style="display:none"></div>
</template>

<script>
import Shake from 'shake.js'
export default {
  name: 'shake',
  props: {
    stop: Boolean,
    threshold: {
      type: Number,
      default: 15
    },
    timeout: {
      type: Number,
      default: 1000
    }
  },
  mounted () {
    const _this = this
    this._shake = new Shake({
      threshold: _this.threshold, // optional shake strength threshold
      timeout: _this.timeout // optional, determines the frequency of event generation
    })
    this._handler = function () {
      if (!_this.stop) {
        _this.$emit('on-shake')
      }
    }
    window.addEventListener('shake', this._handler, false)
    this._shake.start()
  },
  beforeDestroy () {
    window.removeEventListener('shake', this._handler, false)
  }
}
</script>
