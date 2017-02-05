<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
  export default{
    data () {
      return {
        valid: true,
        errors: []
      }
    },
    methods: {
      validate () {
        this.errors.length = 0
        this.valid = true
        this.validateChildren(this.$children)
      },
      validateChildren (children) {
        children.forEach(child => {
          if (typeof child.setTouched === 'function') {
            child.setTouched()
          }
          if (typeof child.validate === 'function') {
            child.validate()
            if (!child.valid) {
              this.valid = false
              this.errors.push(child.errors)
            }
          } else if (child.$children) {
            this.validateChildren(child.$children)
          }
        })
      }
    }
  }
</script>