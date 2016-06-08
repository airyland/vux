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
import shuffle from 'array-shuffle'

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
      twoWay: true
    },
    max: Number,
    min: Number,
    fillMode: Boolean,
    randomOrder: Boolean
  },
  ready () {
    this.handleChangeEvent = true
    if (this.randomOrder) {
      this.options = shuffle(this.options)
    }
  },
  computed: {
    _total () {
      return this.fillMode ? (this.options.length + 1) : this.options.length
    },
    _min () {
      if (!this.required) {
        return 0
      }
      if (this.min) {
        if (this.min < 0) {
          return 1
        }
        if (this.min >= this._total) {
          return this._total
        }
        return this.min
      } else {
        return 1
      }
    },
    _max () {
      if (!this.required) {
        return this._total
      }
      if (this.max) {
        if (this.max > this._total) {
          return this._total
        }
        return this.max
      } else {
        return this._total
      }
    },
    valid () {
      return this.value.length >= this._min && this.value.length <= this._max
    },
    error () {
      let err = []
      if (this.value.length < this._min) {
        err.push(this.$interpolate('最少要选择{{_min}}个哦'))
      }
      if (this.value.length > this._max) {
        err.push(this.$interpolate('最多只能选择{{_max}}个哦'))
      }
      return err
    }
  },
  watch: {
    value (newVal) {
      this.$emit('on-change', JSON.parse(JSON.stringify(newVal)))
    }
  }
}
</script>

<style>
.weui_cells_checkbox > label > * {
  pointer-events: none;
}
</style>
