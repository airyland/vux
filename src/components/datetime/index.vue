<template>
  <a class="vux-datetime weui-cell weui-cell_access" href="javascript:">
    <slot>
      <div>
        <p :style="{width: $parent.labelWidth, textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}" v-html="title"></p>
        <inline-desc v-if="inlineDesc">{{inlineDesc}}</inline-desc>
      </div>
      <div class="weui-cell__ft vux-cell-primary vux-datetime-value" :style="{textAlign: valueTextAlign}">
        {{ currentValue || placeholder}}
        <icon class="vux-input-icon" type="warn" v-show="!valid" :title="firstError"></icon>
      </div>
    </slot>
  </a>
</template>

<script>
import Icon from '../icon'
import Picker from './datetimepicker'
import Group from '../group'
import InlineDesc from '../inline-desc'
import Base from '../../libs/base'

export default {
  mixins: [Base],
  components: {
    Group,
    InlineDesc,
    Icon
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
      default: ''
    },
    inlineDesc: String,
    placeholder: String,
    minYear: Number,
    maxYear: Number,
    confirmText: {
      type: String,
      default: 'ok'
    },
    cancelText: {
      type: String,
      default: 'cancel'
    },
    clearText: String,
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
    },
    required: {
      type: Boolean,
      default: false
    },
    minHour: {
      type: Number,
      default: 0
    },
    maxHour: {
      type: Number,
      default: 23
    },
    startDate: String,
    endDate: String,
    valueTextAlign: String
  },
  created () {
    this.currentValue = this.value
    this.handleChangeEvent = true
  },
  data () {
    return {
      currentValue: null,
      valid: true,
      errors: {}
    }
  },
  mounted () {
    const uuid = this.uuid
    this.$nextTick(() => {
      this.$el.setAttribute('id', 'vux-datetime-' + uuid)
      this.render()
    })
  },
  computed: {
    pickerOptions () {
      const _this = this
      const options = {
        trigger: '#vux-datetime-' + this.uuid,
        format: this.format,
        value: this.currentValue,
        output: '.vux-datetime-value',
        confirmText: this.confirmText,
        cancelText: _this.cancelText,
        clearText: _this.clearText,
        yearRow: this.yearRow,
        monthRow: this.monthRow,
        dayRow: this.dayRow,
        hourRow: this.hourRow,
        minuteRow: this.minuteRow,
        minHour: this.minHour,
        maxHour: this.maxHour,
        startDate: this.startDate,
        endDate: this.endDate,
        onConfirm (value) {
          _this.currentValue = value
        },
        onClear (value) {
          _this.$emit('on-clear', value)
        },
        onHide () {
          _this.validate()
        }
      }
      if (this.minYear) {
        options.minYear = this.minYear
      }
      if (this.maxYear) {
        options.maxYear = this.maxYear
      }
      return options
    },
    firstError () {
      let key = Object.keys(this.errors)[0]
      return this.errors[key]
    }
  },
  methods: {
    render () {
      if (this.picker) {
        this.picker.destroy()
      }
      this.picker = new Picker(this.pickerOptions)
    },
    validate () {
      if (!this.currentValue && this.required) {
        this.valid = false
        this.errors.required = '必填'
        return
      }
      this.valid = true
      this.errors = {}
    }
  },
  watch: {
    currentValue (val) {
      this.$emit('on-change', val)
      this.$emit('input', val)
      this.validate()
    },
    startDate () {
      this.render()
    },
    endDate () {
      this.render()
    },
    value (val) {
      if (this.currentValue !== val) {
        this.currentValue = val
        this.picker.destroy()
        this.render()
      }
    }
  },
  beforeDestroy () {
    this.picker.destroy()
  }
}
</script>

<style lang="less">
@import '../../styles/variable.less';

.scroller-component {
  display: block;
  position: relative;
  height: 238px;
  overflow: hidden;
  width: 100%;
}

.scroller-content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: -1;
}

.scroller-mask {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  margin: 0 auto;
  width: 100%;
  z-index: 3;
  background-image:
    linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.6)),
    linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.6));
  background-position: top, bottom;
  background-size: 100% 102px;
  background-repeat: no-repeat;
}

.scroller-item {
  text-align: center;
  font-size: 16px;
  height: 34px;
  line-height: 34px;
  color: #000;
}

.scroller-indicator {
  width: 100%;
  height: 34px;
  position: absolute;
  left: 0;
  top: 102px;
  z-index: 3;
  background-image:
    linear-gradient(to bottom, #d0d0d0, #d0d0d0, transparent, transparent),
    linear-gradient(to top, #d0d0d0, #d0d0d0, transparent, transparent);
  background-position: top, bottom;
  background-size: 100% 1px;
  background-repeat: no-repeat;
}

.dp-container {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 10000;
  background-color: #fff;
  display: none;
  transition: transform 0.3s ease;
  transform: translateY(100%);
}

.dp-mask {
  z-index: 998;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  opacity: 0;
  transition: opacity 0.1s ease;
  background-color: #000;
  z-index: 9999;
}

.dp-header {
  display: flex;
  width: 100%;
  box-align: center;
  align-items: center;
  background-image: linear-gradient(to bottom, #e7e7e7, #e7e7e7, transparent, transparent);
  background-position: bottom;
  background-size: 100% 1px;
  background-repeat: no-repeat;
}

.dp-header .dp-item {
  color: @datetime-header-item-font-color;
  font-size: 18px;
  height: 44px;
  line-height: 44px;
  cursor: pointer;
}

.dp-header .dp-item.dp-left {
  color: @datetime-header-item-cancel-font-color;
}

.dp-header .dp-item.dp-right {
  color: @datetime-header-item-confirm-font-color;
}

.dp-content {
  display: flex;
  width: 100%;
  box-align: center;
  align-items: center;
  padding: 10px 0;
}

.dp-header .dp-item,
.dp-content .dp-item {
  box-sizing: border-box;
  flex: 1;
  text-align: center;
}

.vux-datetime .vux-input-icon {
  float: right;
}
.vux-cell-primary {
  flex: 1;
}
</style>