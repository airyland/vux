<template>
  <div class="weui_cells_title">{{title}}</div>
  <div class="weui_cells weui_cells_checkbox">
    <label class="weui_cell weui_check_label" for="checkbox_{{uuid}}_{{index}}" v-for="(index,one) in options">
      <div class="weui_cell_hd">
        <input type="checkbox" class="weui_check" value="{{one | getKey}}" v-model="value" id="checkbox_{{uuid}}_{{index}}">
        <i class="weui_icon_checked"></i>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <p>{{one | getValue}}</p>
      </div>
    </label>
  </div>
  <tip v-show="!valid && dirty"><icon type="warn" class="icon_small"></icon>{{error}}</tip>
</template>

<script>
import Base from '../../libs/base'
import Tip from '../tip'
import Icon from '../icon'
import { getValue, getKey } from './object-filter'
import shuffle from 'lodash.shuffle'

export default {
  components: {
    Tip,
    Icon
  },
  filters: {
    getValue,
    getKey
  },
  mixins: [Base],
  props: {
    title: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      required: false,
      twoWay: true
    },
    max: {
      type: Number,
      required: false
    },
    min: {
      type: Number,
      required: false
    },
    fillMode: {
      type: Boolean,
      default: false
    },
    randomOrder: {
      type: Boolean,
      default: false
    }
  },
  ready () {
    this.handleChangeEvent = true
    let total = this.fillMode ? (this.options.length + 1) : this.options.length
    if (this.max) {
      if (this.max > total) {
        this.max = total
      }
    } else {
      this.max = total
    }

    if (this.min) {
      if (this.min < 0) {
        this.min = 1
      }
      if (this.min >= total) {
        this.min = total
      }
    } else {
      this.min = 1
    }

    if (!this.required) {
      this.min = 0
    }

    if (this.randomOrder) {
      this.options = shuffle(this.options)
    }
  },
  computed: {
    valid: function () {
      return this.value.length >= this.min && this.value.length <= this.max
    },
    error: function () {
      let err = []
      if (this.value.length < this.min) {
        err.push(this.$interpolate('最少要选择{{min}}个哦'))
      }
      if (this.value.length > this.max) {
        err.push(this.$interpolate('最多只能选择{{max}}个哦'))
      }
      return err
    }
  },
  data () {
    return {
    }
  },
  watch: {
    value: function (newVal) {
      this.$dispatch('on-change', JSON.parse(JSON.stringify(newVal)))
    }
  }
}
</script>

<style>
.weui_cells_checkbox > label > * {
  pointer-events: none;
}
</style>
