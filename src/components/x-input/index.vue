<template>
	<div class="vux-x-input weui-cell" :class="{'weui-cell_warn': !valid}">
    <div class="weui-cell__hd">
      <div :style="labelStyles" v-if="hasRestrictedLabel">
        <slot name="restricted-label"></slot>
      </div>
      <slot name="label">
        <label class="weui-label" :style="{width: $parent.labelWidth || (labelWidth + 'em'), textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}" v-if="title" v-html="title"></label>
        <inline-desc v-if="inlineDesc">{{inlineDesc}}</inline-desc>
      </slot>
    </div>
    <div class="weui-cell__bd weui-cell__primary" :class="placeholderAlign ? `vux-x-input-placeholder-${placeholderAlign}` : ''">
      <input
      v-if="!type || type === 'text'"
      class="weui-input"
      :maxlength="max"
      :autocomplete="autocomplete"
      :autocapitalize="autocapitalize"
      :autocorrect="autocorrect"
      :spellcheck="spellcheck"
      :style="inputStyle"
      type="text"
      :name="name"
      :pattern="pattern"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      v-model="currentValue"
      @focus="focusHandler"
      @blur="blur"
      ref="input"/>
      <input
      v-if="type === 'number'"
      class="weui-input"
      :maxlength="max"
      :autocomplete="autocomplete"
      :autocapitalize="autocapitalize"
      :autocorrect="autocorrect"
      :spellcheck="spellcheck"
      :style="inputStyle"
      type="number"
      :name="name"
      :pattern="pattern"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      v-model="currentValue"
      @focus="focusHandler"
      @blur="blur"
      ref="input"/>
      <input
      v-if="type === 'email'"
      class="weui-input"
      :maxlength="max"
      :autocomplete="autocomplete"
      :autocapitalize="autocapitalize"
      :autocorrect="autocorrect"
      :spellcheck="spellcheck"
      :style="inputStyle"
      type="email"
      :name="name"
      :pattern="pattern"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      v-model="currentValue"
      @focus="focusHandler"
      @blur="blur"
      ref="input"/>
      <input
      v-if="type === 'password'"
      class="weui-input"
      :maxlength="max"
      :autocomplete="autocomplete"
      :autocapitalize="autocapitalize"
      :autocorrect="autocorrect"
      :spellcheck="spellcheck"
      :style="inputStyle"
      type="password"
      :name="name"
      :pattern="pattern"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      v-model="currentValue"
      @focus="focusHandler"
      @blur="blur"
      ref="input"/>
      <input
      v-if="type === 'tel'"
      class="weui-input"
      :maxlength="max"
      :autocomplete="autocomplete"
      :autocapitalize="autocapitalize"
      :autocorrect="autocorrect"
      :spellcheck="spellcheck"
      :style="inputStyle"
      type="tel"
      :name="name"
      :pattern="pattern"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      v-model="currentValue"
      @focus="focusHandler"
      @blur="blur"
      ref="input"/>
    </div>
    <div class="weui-cell__ft">
      <icon type="clear" v-show="!equalWith && showClear && currentValue && !readonly && !disabled" @click.native="clear"></icon>

      <icon class="vux-input-icon" type="warn" :title="!valid ? firstError : ''" v-show="!novalidate && !equalWith && ((touched && !valid && firstError) || (forceShowError && !valid && firstError))"></icon>
      <icon class="vux-input-icon" type="warn" v-if="!novalidate && hasLengthEqual && dirty && equalWith && !valid"></icon>
      <icon type="success" v-show="!novalidate && equalWith && equalWith === currentValue && valid"></icon>

      <icon type="success" class="vux-input-icon" v-show="novalidate && iconType === 'success'"></icon>
      <icon type="warn" class="vux-input-icon" v-show="novalidate && iconType === 'error'"></icon>

      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import Base from '../../libs/base'
import Icon from '../icon'
import InlineDesc from '../inline-desc'

import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'

import Debounce from '../../tools/debounce'

const validators = {
  'email': {
    fn: isEmail,
    msg: '邮箱格式'
  },
  'china-mobile': {
    fn (str) {
      return isMobilePhone(str, 'zh-CN')
    },
    msg: '手机号码'
  },
  'china-name': {
    fn (str) {
      return str.length >= 2 && str.length <= 6
    },
    msg: '中文姓名'
  }
}
export default {
  created () {
    this.currentValue = this.value || ''
    if (!this.title && !this.placeholder && !this.currentValue) {
      console.warn('no title and no placeholder?')
    }
    if (this.required && !this.currentValue) {
      this.valid = false
    }
    this.handleChangeEvent = true
    if (this.debounce) {
      this._debounce = Debounce(() => {
        this.$emit('on-change', this.currentValue)
      }, this.debounce)
    }
  },
  mounted () {
    if (this.$slots && this.$slots['restricted-label']) {
      this.hasRestrictedLabel = true
    }
  },
  beforeDestroy () {
    if (this._debounce) {
      this._debounce.cancel()
    }
  },
  mixins: [Base],
  components: {
    Icon,
    InlineDesc
  },
  props: {
    required: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    value: [String, Number],
    name: String,
    readonly: Boolean,
    disabled: Boolean,
    keyboard: String,
    inlineDesc: String,
    isType: [String, Function],
    min: Number,
    max: Number,
    showClear: {
      type: Boolean,
      default: true
    },
    equalWith: String,
    textAlign: String,
    // https://github.com/yisibl/blog/issues/3
    autocomplete: {
      type: String,
      default: 'off'
    },
    autocapitalize: {
      type: String,
      default: 'off'
    },
    autocorrect: {
      type: String,
      default: 'off'
    },
    spellcheck: {
      type: String,
      default: 'false'
    },
    novalidate: {
      type: Boolean,
      default: false
    },
    iconType: String,
    debounce: Number,
    placeholderAlign: String
  },
  computed: {
    labelStyles () {
      return {
        width: this.$parent.labelWidth || (this.labelWidth + 'em'),
        textAlign: this.$parent.labelAlign,
        marginRight: this.$parent.labelMarginRight
      }
    },
    pattern () {
      if (this.keyboard === 'number' || this.isType === 'china-mobile') {
        return '[0-9]*'
      }
    },
    labelWidth () {
      return this.title.replace(/[^x00-xff]/g, '00').length / 2 + 1
    },
    hasErrors () {
      return Object.keys(this.errors).length > 0
    },
    inputStyle () {
      if (this.textAlign) {
        return {
          textAlign: this.textAlign
        }
      }
    }
  },
  methods: {
    reset (value = '') {
      this.dirty = false
      this.currentValue = value
      this.firstError = ''
      this.valid = true
    },
    clear () {
      this.currentValue = ''
      this.$refs.input.focus()
    },
    focus () {
      this.$refs.input.focus()
    },
    focusHandler () {
      this.$emit('on-focus', this.currentValue)
    },
    blur () {
      this.setTouched()
      this.validate()
      this.$emit('on-blur', this.currentValue)
    },
    getError () {
      let key = Object.keys(this.errors)[0]
      this.firstError = this.errors[key]
    },
    validate () {
      if (typeof this.equalWith !== 'undefined') {
        this.validateEqual()
        return
      }
      this.errors = {}

      if (!this.currentValue && !this.required) {
        this.valid = true
        return
      }

      if (!this.currentValue && this.required) {
        this.valid = false
        this.errors.required = '必填哦'
        this.getError()
        return
      }

      if (typeof this.isType === 'string') {
        const validator = validators[this.isType]
        if (validator) {
          this.valid = validator[ 'fn' ](this.currentValue)
          if (!this.valid) {
            this.errors.format = validator[ 'msg' ] + '格式不对哦~'
            return
          } else {
            delete this.errors.format
          }
        }
      }

      if (typeof this.isType === 'function') {
        const validStatus = this.isType(this.currentValue)
        this.valid = validStatus.valid
        if (!this.valid) {
          this.errors.format = validStatus.msg
          this.forceShowError = true
          if (!this.firstError) {
            this.getError()
          }
          return
        } else {
          delete this.errors.format
        }
      }

      if (this.min) {
        if (this.currentValue.length < this.min) {
          this.errors.min = `最少应该输入${this.min}个字符哦`
          this.valid = false
          if (!this.firstError) {
            this.getError()
          }
          return
        } else {
          delete this.errors.min
        }
      }

      if (this.max) {
        if (this.currentValue.length > this.max) {
          this.errors.max = `最多可以输入${this.max}个字符哦`
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
    validateEqual () {
      if (!this.equalWith && this.currentValue) {
        this.valid = false
        this.errors.equal = '输入不一致'
        return
      }
      let willCheck = this.dirty || this.currentValue.length >= this.equalWith.length
      // 只在长度符合时显示正确与否
      if (willCheck && this.currentValue !== this.equalWith) {
        this.valid = false
        this.errors.equal = '输入不一致'
        return
      } else {
        if (!this.currentValue && this.required) {
          this.valid = false
        } else {
          this.valid = true
          delete this.errors.equal
        }
      }
    }
  },
  data () {
    let data = {
      hasRestrictedLabel: false,
      firstError: '',
      forceShowError: false,
      hasLengthEqual: false,
      valid: true,
      currentValue: ''
    }
    return data
  },
  watch: {
    valid () {
      this.getError()
    },
    value (val) {
      this.currentValue = val
    },
    equalWith (newVal) {
      if (newVal && this.equalWith) {
        if (newVal.length === this.equalWith.length) {
          this.hasLengthEqual = true
        }
        this.validateEqual()
      } else {
        this.validate()
      }
    },
    currentValue (newVal) {
      if (!this.equalWith && newVal) {
        this.validateEqual()
      }
      if (newVal && this.equalWith) {
        if (newVal.length === this.equalWith.length) {
          this.hasLengthEqual = true
        }
        this.validateEqual()
      } else {
        this.validate()
      }
      this.$emit('input', newVal)
      if (this._debounce) {
        this._debounce()
      } else {
        this.$emit('on-change', newVal)
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_cell/weui_access';
@import '../../styles/weui/widget/weui_cell/weui_cell_global';
@import '../../styles/weui/widget/weui_cell/weui_form/weui_form_common';
@import '../../styles/weui/widget/weui_cell/weui_form/weui_vcode';
.vux-x-input .vux-x-input-placeholder-right input::-webkit-input-placeholder {
  text-align: right;
}
.vux-x-input .vux-x-input-placeholder-center input::-webkit-input-placeholder {
  text-align: center;
}
.vux-input-icon.vux-input-icon {
  font-size: 21px;
}
.vux-input-icon.weui-icon-warn:before, .vux-input-icon.weui-icon-success:before {
  font-size: 21px;
}
.vux-x-input .weui-icon {
  padding-left: 5px;
}
.vux-x-input.weui-cell_vcode {
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
}
</style>
