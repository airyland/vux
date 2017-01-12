<template>
  <div>
    <div v-show="title" class="weui_cells_title">{{title}}</div>
    <slot name="after-title"></slot>
    <div class="weui_cells weui_cells_checkbox">
      <label class="weui_cell weui_check_label" :for="`checkbox_${uuid}_${index}`" v-for="(one, index) in currentOptions">
        <div class="weui_cell_hd">
          <input type="checkbox" class="weui_check" :name="`vux-checkbox-${uuid}`" :value="getKey(one)" v-model="currentValue" :id="`checkbox_${uuid}_${index}`" :disabled="ifDisable(getKey(one))">
          <i class="weui_icon_checked vux-checklist-icon-checked"></i>
        </div>
        <div class="weui_cell_bd weui_cell_primary">
          <p v-html="getValue(one)"></p>
        </div>
      </label>
    </div>
    <slot name="footer"></slot>
  </div>
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
    name: String,
    showError: Boolean,
    title: String,
    required: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    },
    max: Number,
    min: Number,
    fillMode: Boolean,
    randomOrder: Boolean
  },
  data () {
    return {
      currentValue: [],
      currentOptions: this.options
    }
  },
  created () {
    this.handleChangeEvent = true
    if (this.value) {
      this.currentValue = this.value
    }
    if (this.randomOrder) {
      this.currentOptions = shuffle(this.options)
    } else {
      this.currentOptions = this.options
    }
  },
  methods: {
    getValue,
    getKey,
    ifDisable (key) {
      return this.currentValue.indexOf(key) === -1 && this.currentValue.length === this._max
    }
  },
  computed: {
    _total () {
      return this.fillMode ? (this.options.length + 1) : this.options.length
    },
    _min () {
      if (!this.required && !this.min) {
        return 0
      }
      if (!this.required && this.min) {
        return Math.min(this._total, this.min)
      }
      if (this.required) {
        if (this.min) {
          let max = Math.max(1, this.min)
          return Math.min(this._total, max)
        } else {
          return 1
        }
      }
    },
    _max () {
      if (!this.required && !this.max) {
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
      return this.currentValue.length >= this._min && this.currentValue.length <= this._max
    }
  },
  watch: {
    value (newVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(this.currentValue)) {
        this.currentValue = newVal
      }
    },
    options (val) {
      this.currentOptions = val
    },
    currentValue (newVal) {
      const val = pure(newVal)
      this.$emit('on-change', val)
      this.$emit('input', val)

      let err = {}
      if (this._min) {
        if (this.required) {
          if (this.currentValue.length < this._min) {
            err = {
              min: this._min
            }
          }
        } else {
          if (this.currentValue.length && this.currentValue.length < this._min) {
            err = {
              min: this._min
            }
          }
        }
      }
      if (!this.valid && this.dirty && Object.keys(err).length) {
        this.$emit('on-error', err)
      } else {
        this.$emit('on-clear-error')
      }
    }
  }
}
function pure (obj) {
  return JSON.parse(JSON.stringify(obj))
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_cell/weui_cell_global';
@import '../../styles/weui/widget/weui_cell/weui_check';

.weui_cells_checkbox .weui_check:checked + .vux-checklist-icon-checked:before {
  color: @checklist-icon-active-color;
}

.weui_cells_checkbox > label > * {
  pointer-events: none;
}
.weui_cells > a {
  color:#000;
}
</style>
