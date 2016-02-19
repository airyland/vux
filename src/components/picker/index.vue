<template>
  <div>
    <div class="vuee-picker"></div>
  </div>
</template>

<script>
import Scroller from './scroller'
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      required: false,
      twoWay: true
    },
    item_class: {
      type: String,
      default: 'scroller-item'
    }
  },
  ready () {
    var _this = this
    var uuid = Math.random().toString(36).substring(3, 8)
    this.$el.querySelector('.vuee-picker').setAttribute('id', 'vuee-picker-' + uuid)
    this.scroller = new Scroller('#' + 'vuee-picker-' + uuid, {
      data: this.data,
      defaultValue: this.value,
      itemClass: this.item_class,
      onSelect: function (value) {
        _this.value = value
      }
    });
    this.$dispatch('change', this.value || this.data[0].value)
  },
  watch: {
    value: function (newVal) {
      this.$dispatch('change', newVal)
      if (this.scroller.value !== newVal) {
        this.scroller.select(newVal)
      }
    }
  },
  beforeDestroy: function () {
    this.scroller.destroy()
  }
}
</script>

<style>
@import './scroller.css'
</style>