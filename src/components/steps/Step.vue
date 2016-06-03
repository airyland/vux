<template>
	<div class="v-steps">
    <slot></slot>
	</div>
</template>

<script>

export default {
  props: {
    current: {
      type: Number
    }
  },

  ready () {
    this._mapPropsToChildComponent()
  },

  watch: {
    current () {
      this._mapPropsToChildComponent()
    }
  },

  methods: {
    _mapPropsToChildComponent () {
      const _this = this
      const len = this.$children.length - 1
      this.$children.forEach((child, index) => {
        child.stepNumber = (index + 1).toString()
        child.stepLast = index === len

        if (index === _this.current) {
          child.status = 'process'
        } else if (index < _this.current) {
          child.status = 'finish'
        } else {
          child.status = 'wait'
        }
      })
    }
  }
}
</script>

<style lang="less">
.v-steps {
  display: flex;
  padding: 1rem;
}
</style>