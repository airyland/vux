<template>
  <form
    ref="form"
    class="vux-form"
  >
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: 'VuxForm',
  provide () {
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      formFields: []
    }
  },
  methods: {
    validate (cb) {
      let promise
      // if no callback, return promise
      if (typeof cb !== 'function' && window.Promise) {
        promise = new window.Promise((resolve, reject) => {
          cb = function (valid) {
            valid ? resolve(valid) : reject(valid)
          }
        })
      }
      const { formFields } = this
      let valid = true
      let count = 0
      let invalidFields = {}
      formFields.forEach((field) => {
        field.validate((message, field) => {
          if (message) valid = false
          invalidFields = Object.assign({}, invalidFields, field)
          if (typeof cb === 'function' && ++count === formFields.length) {
            cb(valid, invalidFields)
          }
        })
      })
      if (promise) {
        return promise
      }
    },
    addField (field) {
      this.formFields.push(field)
    },
    removeField (field) {
      if (field.prop) {
        this.formFields.splice(this.formFields.indexOf(field), 1)
      }
    },
    resetFields () {
      if (!this.model) {
        // eslint-disable-next-line no-console
        console.warn(
          '[vux-form warn]model is required for resetFields to work.'
        )
      }
      this.formFields.forEach((field) => {
        field.resetField()
      })
    },
    clearValidate (props = []) {
      const fields = props.length
        ? typeof props === 'string'
          ? this.formFields.filter((field) => props === field.prop)
          : this.formFields.filter((field) => props.indexOf(field.prop) > -1)
        : this.formFields
      fields.forEach((field) => {
        field.clearValidate()
      })
    }
  }
}
</script>
<style lang="less">
</style>
