<template>
  <a class="weui_cell" href="javascript:">
    <div class="weui_cell_bd weui_cell_primary">
      <p>{{title}}</p>
      <inline-desc v-if="inlineDesc">{{inlineDesc}}</inline-desc>
    </div>
    <div class="weui_cell_ft with_arrow vux-datetime-value">{{value}}</div>
  </a>
</template>

<script>
import Picker from './datetimepicker'
import Group from '../group'
import InlineDesc from '../inline-desc'
import Base from '../../libs/base'

export default {
  mixins: [Base],
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
    inlineDesc: {
      type: String
    },
    placeholder: {
      type: String
    },
    minYear: {
      type: Number
    },
    maxYear: {
      type: Number
    },
    confirmText: {
      type: String,
      default: 'ok'
    },
    cancelText: {
      type: String,
      default: 'cancel'
    },
    yearRow: {
      type: String,
      default: '{value}'
    },
    monthRow: {
      type: String,
      default: '{value}'
    },
    dayRow: {
      type: String,
      default: '{value}'
    },
    hourRow: {
      type: String,
      default: '{value}'
    },
    minuteRow: {
      type: String,
      default: '{value}'
    }
  },
  ready () {
    const uuid = this.uuid
    this.$el.setAttribute('id', 'vux-datetime-' + uuid)
    this.render()
  },
  computed: {
    pickerOptions: function () {
      const _this = this
      const options = {
        trigger: '#vux-datetime-' + this.uuid,
        format: this.format,
        value: this.value,
        output: '.vux-datetime-value',
        confirmText: this.confirmText,
        cancelText: _this.cancelText,
        yearRow: this.yearRow,
        monthRow: this.monthRow,
        dayRow: this.dayRow,
        hourRow: this.hourRow,
        minuteRow: this.minuteRow,
        onConfirm: function (value) {
          _this.value = value
        }
      }
      if (this.minYear) {
        options.minYear = this.minYear
      }
      if (this.maxYear) {
        options.maxYear = this.maxYear
      }
      return options
    }
  },
  methods: {
    render: function () {
      if (this.picker) {
        this.picker.destroy()
      }
      this.picker = new Picker(this.pickerOptions)
    }
  },
  watch: {
    value: function (val) {
      this.$dispatch('on-change', val)
    }
  },
  beforeDestroy () {
    this.picker.destroy()
  }
}
</script>

<style>
@import './datetimepicker.css';
</style>
