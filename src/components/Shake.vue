<template>
  <div style="display:none"></div>
</template>

<script>
import Shake from 'shake.js'
export default {
  props: {
    stop: {
      type: Boolean,
      default: false
    }
  },
  ready () {
    const _this = this
    this._shake = new Shake({
      threshold: 15, // optional shake strength threshold
      timeout: 1000 // optional, determines the frequency of event generation
    })
    this._handler = function () {
      if (!_this.stop) {
        _this.$dispatch('shake')
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