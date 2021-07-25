<template>
  <div
    class="vux-form-field"
    :class="{
    'is-required': isRequired,
    'is-success': validateState === 'success',
    'is-error': validateState === 'error',
  }"
  >
    <slot></slot>
  </div>
</template>
<script>
import AsyncValidator from 'async-validator'
export default {
  name: 'VuxFormField',
  inject: ['form'],
  props: {
    prop: String,
    rules: [Object, Array],
    required: Boolean,
    message: String
  },
  computed: {
    isRequired () {
      const { rules, required } = this
      if (rules && rules.length) {
        const rulesRequired = rules.every((rule) => rule.required)
        return rulesRequired || required
      }
      return required
    },
    modelValue () {
      return this.form.model[this.prop]
    }
  },
  watch: {
    fieldValue (val) {
      this.validate()
      this.$emit('on-change', val)
      this.form.model[this.prop] = val
    },
    modelValue (val) {
      this.fieldValue = val
    }
  },
  data () {
    return {
      fieldValue: this.form.model[this.prop],
      validateState: '',
      validateMessage: this.message,
      initialValue: ''
    }
  },
  mounted () {
    const { fieldValue } = this
    if (Array.isArray(fieldValue)) {
      this.initialValue = [].concat(fieldValue)
    } else {
      this.initialValue = fieldValue
    }
  },
  methods: {
    getRules () {
      const selfRules = this.rules || []
      const requiredRule =
        this.isRequired !== undefined ? { required: !!this.isRequired } : []
      if (this.message && this.isRequired) {
        requiredRule.message = this.message
      }
      return selfRules.some((rules) => rules.required)
        ? [].concat(selfRules)
        : [].concat(selfRules, requiredRule)
    },
    validate (cb) {
      const rules = this.getRules()
      const descriptor = {}
      descriptor[this.prop] = rules
      const validator = new AsyncValidator(descriptor)
      const model = {}
      model[this.prop] = this.fieldValue
      validator.validate(
        model,
        { firstFields: true },
        (errors, invalidFields) => {
          this.validateState = errors ? 'error' : 'success'
          this.validteMessage = errors ? errors[0].message : ''
          cb(this.validteMessage, invalidFields)
        }
      )
    },
    clearValidate () {
      this.validateState = ''
      this.validateMessage = ''
    },
    resetField () {
      const { initialValue } = this
      if (Array.isArray(initialValue)) {
        this.fieldValue = [].concat(initialValue)
      } else {
        this.fieldValue = initialValue
      }
      this.$nextTick(() => {
        this.clearValidate()
      })
    }
  },
  created () {
    this.form.addField(this)
  },
  beforeDestroy () {
    this.form.removeField(this)
  }
}
</script>
<style lang="less">
.vux-form-field {
  position: relative;
  &:after {
    position: absolute;
    top: 0;
    right: 0;
    height: 1px;
    color: #d9d9d9;
    border-top: 1px solid #d9d9d9;
    left: 15px;
    content: '';
    transform: scaleY(0.5);
    transform-origin: 0 0;
  }
  &.is-required {
    display: flex;
    align-items: flex-start;
    &::before {
      content: '*';
      display: inline-block;
      vertical-align: middle;
      padding-left: 15px;
      padding-top: 12px;
      color: red;
    }
    .weui-cell,
    .vux-cell-box,
    .vux-uploader {
      flex: 1;
    }
  }
  &.is-error {
    color: red;
    input::placeholder,
    textarea::placeholder {
      color: red;
    }
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
      color: red;
    }
    input::-moz-placeholder,
    textarea::-moz-placeholder {
      color: red;
    }
    input:-ms-input-placeholder,
    textarea:-ms-input-placeholder {
      color: red;
    }
  }
}
</style>
