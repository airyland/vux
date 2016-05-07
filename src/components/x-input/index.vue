<template>
	<div class="weui_cell" :class="{'weui_cell_warn': !valid}">
    <div class="weui_cell_hd">
      <label class="weui_label" :style="{width: labelWidth + 'em'}" v-if="title">{{title}}</label>
      <inline-desc v-if="inlineDesc">{{inlineDesc}}</inline-desc>
    </div>
    <div class="weui_cell_bd weui_cell_primary">
      <input class="weui_input" :style="inputStyle" :type="type" :pattern="pattern" placeholder="{{placeholder}}" v-model="value" :readonly="readonly" @blur="blur" v-el:input/>
    </div>
    <div class="weui_cell_ft">
      <icon type="clear" v-show="showClear && value" @click="clear"></icon>
      <icon type="warn" title="{{!valid ? firstError : ''}}" v-show="!equalWith && ((touched && !valid && firstError) || (forceShowError && !valid && firstError))"></icon>
      <icon type="warn" v-show="hasLengthEqual && dirty && equalWith && !valid"></icon>
      <icon type="success" v-show="equalWith && equalWith===value && valid"></icon>
      <slot name="right"><slot>
    </div>
  </div>
</template>

<script>
import Base from '../../libs/base'
import Icon from '../icon'
import InlineDesc from '../inline-desc'

import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'

const validators = {
  'email': {
    fn: isEmail,
    msg: '邮箱格式'
  },
  'china-mobile': {
    fn: function (str) {
      return isMobilePhone(str, 'zh-CN')
    },
    msg: '手机号码'
  },
  'china-name': {
    fn: function (str) {
      return str.length >= 2 && str.length <= 6
    },
    msg: '中文姓名'
  }
}
export default {
  ready () {
    if (!this.title && !this.placeholder) {
      console.warn('no title and no placeholder?')
    }
    if (this.equalWith) {
      this.showClear = false
    }
  },
  mixins: [Base],
  components: {
    Icon,
    InlineDesc
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String
    },
    value: {
      type: String,
      default: '',
      twoWay: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    keyboard: {
      type: String
    },
    inlineDesc: {
      type: String
    },
    isType: {
      type: String
    },
    min: Number,
    max: Number,
    showClear: {
      type: Boolean,
      default: true
    },
    equalWith: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    textAlign: String
  },
  computed: {
    pattern: function () {
      if (this.keyboard === 'number' || this.isType === 'china-mobile') {
        return '[0-9]*'
      }
    },
    labelWidth: function () {
      return this.title.replace(/[^x00-xff]/g, '00').length / 2 + 1
    },
    hasErrors: function () {
      return Object.keys(this.errors).length > 0
    },
    inputStyle: function () {
      if (this.textAlign) {
        return {
          textAlign: this.textAlign
        }
      }
    }
  },
  methods: {
    clear: function () {
      this.value = ''
      this.focus = true
    },
    blur: function () {
      this.setTouched()
      this.validate()
    },
    getError: function () {
      let key = Object.keys(this.errors)[0]
      this.firstError = this.errors[key]
    },
    validate: function () {
      if (this.equalWith) {
        this.validateEqual()
        return
      }
      this.errors = {}

      if (!this.value && !this.required) {
        this.valid = true
        return
      }

      if (!this.value && this.required) {
        this.valid = false
        this.errors.required = '必填哦'
        return
      }

      const validator = validators[this.isType]
      if (validator) {
        this.valid = validator[ 'fn' ](this.value)
        if (!this.valid) {
          this.errors.format = validator[ 'msg' ] + '格式不对哦~'
          return
        } else {
          delete this.errors.format
        }
      }

      if (this.min) {
        if (this.value.length < this.min) {
          this.errors.min = this.$interpolate('最少应该输入{{min}}个字符哦')
          this.valid = false
          return
        } else {
          delete this.errors.min
        }
      }

      if (this.max) {
        if (this.value.length > this.max) {
          this.errors.max = this.$interpolate('最多可以输入{{max}}个字符哦')
          this.valid = false
          this.forceShowError = true
          return
        } else {
          this.forceShowError = false
          delete this.errors.max
        }
      }

      this.valid = true
    },
    validateEqual: function () {
      let willCheck = this.dirty || this.value.length >= this.equalWith.length
      // 只在长度符合时显示正确与否
      if (willCheck && this.value !== this.equalWith) {
        this.valid = false
        this.errors.equal = '输入不一致'
        return
      } else {
        this.valid = true
        delete this.errors.equal
      }
    }
  },
  data: function () {
    let data = {
      firstError: '',
      forceShowError: false,
      hasLengthEqual: false,
      focus: false
    }
    return data
  },
  watch: {
    focus: function (newVal) {
      if (newVal) {
        this.$els.input.focus()
      }
    },
    valid: function () {
      this.getError()
    },
    value: function (newVal) {
      if (this.equalWith) {
        if (newVal.length === this.equalWith.length) {
          this.hasLengthEqual = true
        }
        this.validateEqual()
      } else {
        this.validate()
      }
    }
  }
}
</script>
