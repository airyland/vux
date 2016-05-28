<template>
  <div style="height:100px;font-size:100px;"></div>
</template>

<script>
import Roller from './lib'

export default {
  props: {
    number: Number,
    width: {
      type: Number,
      default: 3
    }
  },
  ready () {
    this._roller = new Roller({
      container: this.$el,
      width: this.width
    })
    this._roller.roll(this.number)
  },
  watch: {
    number (val) {
      this._roller.roll(val)
    }
  }
}
</script>
