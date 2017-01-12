<template>
	<div class="weui_cell" :class="{'weui_cell_warn': !valid}">
    <div class="weui_cell_hd">
      <label class="weui_label" :style="{width: $parent.labelWidth || (labelWidth + 'em'), textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}" v-if="title" v-html="title"></label>
      <inline-desc v-if="inlineDesc">{{inlineDesc}}</inline-desc>
    </div>
    <div class="weui_cell_bd weui_cell_primary">
      <input
      v-if="!type || type === 'text' "
      class="weui_input"
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
      v-model="currentValue"
      @blur="blur"
      ref="input"/>
      <input
      v-if="type === 'number' "
      class="weui_input"
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
      v-model="currentValue"
      @blur="blur"
      ref="input"/>
      <input
      v-if="type === 'email' "
      class="weui_input"
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
      v-model="currentValue"
      @blur="blur"
      ref="input"/>
      <input
      v-if="type === 'password' "
      class="weui_input"
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
      v-model="currentValue"
      @blur="blur"
      ref="input"/>
    </div>
    <div class="weui_cell_ft">
      <icon type="clear" v-show="!equalWith && showClear && currentValue && !readonly" @click.native="clear"></icon>

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
    if (this.isType === 'email') {
      this.type = 'email'
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
    readonly: {
      type: Boolean,
      default: false
    },
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
    iconType: String
  },
  computed: {
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
    clear () {
      this.currentValue = ''
      this.focus = true
    },
    blur () {
      this.setTouched()
      this.validate()
    },
    getError () {
      let key = Object.keys(this.errors)[0]
      this.firstError = this.errors[key]
    },
    validate () {
      if (this.equalWith) {
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
          return
        } else {
          delete this.errors.format
        }
      }

      if (this.min) {
        if (this.currentValue.length < this.min) {
          this.errors.min = `最少应该输入${this.min}个字符哦`
          this.valid = false
          this.getError()
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
      let willCheck = this.dirty || this.currentValue.length >= this.equalWith.length
      // 只在长度符合时显示正确与否
      if (willCheck && this.currentValue !== this.equalWith) {
        this.valid = false
        this.errors.equal = '输入不一致'
        return
      } else {
        this.valid = true
        delete this.errors.equal
      }
    }
  },
  data () {
    let data = {
      firstError: '',
      forceShowError: false,
      hasLengthEqual: false,
      focus: false,
      valid: true,
      currentValue: ''
    }
    return data
  },
  watch: {
    focus (newVal) {
      if (newVal) {
        this.$refs.input.focus()
      }
    },
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
      if (newVal && this.equalWith) {
        if (newVal.length === this.equalWith.length) {
          this.hasLengthEqual = true
        }
        this.validateEqual()
      } else {
        this.validate()
      }
      this.$emit('input', newVal)
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_cell/weui_access';
@import '../../styles/weui/widget/weui_cell/weui_cell_global';
@import '../../styles/weui/widget/weui_cell/weui_form/weui_form_common';
@import '../../styles/weui/widget/weui_cell/weui_form/weui_vcode';
.vux-input-icon.weui_icon_warn:before, .vux-input-icon.weui_icon_success:before {
  font-size: 21px;
}
</style>
