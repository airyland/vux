<template>
<a class="weui_cell" href="javascript:">
  <div class="weui_cell_bd weui_cell_primary">
    <p>{{title}}</p>
    <inline-desc v-if="inline_desc">{{inline_desc}}</inline-desc>
  </div>
  <div class="weui_cell_ft with_arrow vux-datetime-value">{{value}}</div>
</a>
</template>

<script>
import Picker from './datetimepicker'
import Group from '../Group'
import InlineDesc from '../Inline-desc'

export default {
  components: {
    Group,
    InlineDesc
  },
  props: {
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    title: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: '',
      twoWay: true
    },
    inline_desc: {
      type: String
    },
    placeholder: {
      type: String
    },
    min_year: {
      type: Number
    },
    max_year: {
      type: Number
    }
  },
  created () {
    this.$dispatch('group.class.add', 'weui_cells_access')
  },
  ready () {
    var _this = this
    const uuid = Math.random().toString(36).substring(3, 8)
    this.$el.setAttribute('id', 'vux-datetime-' + uuid)
    var options = {
      trigger: '#vux-datetime-' + uuid,
      format: _this.format,
      value: _this.value,
      output: '.vux-datetime-value',
      onConfirm: function (value) {
        _this.value = value
      }
    }
    if (this.min_year) {
      options.minYear = this.min_year
    }
    if (this.max_year) {
      options.maxYear = this.max_year
    }
    this.picker = new Picker(options)
  },
  watch: {
    value: function (val) {
      this.$dispatch('change', val)
    }
  },
  beforeDestroy () {
    this.picker.destroy()
  }
}
</script>

<style>
@import './datetimepicker.css'
</style>