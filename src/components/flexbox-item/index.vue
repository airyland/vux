<template>
  <div class="vux-flexbox-item" :style="style">
    <slot></slot>
  </div>
</template>

<script>
const prefixList = ['-moz-box-', '-webkit-box-', '']

export default {
  props: {
    span: {
      type: [Number, String]
    }
  },
  methods: {
    buildWidth (width) {
      if (typeof width === 'number') {
        if (width < 1) {
          return width
        } else {
          return width / 12
        }
      } else if (typeof width === 'string') {
        return width.replace('px', '') / this.bodyWidth
      }
    }
  },
  computed: {
    style: function () {
      let styles = {}
      let marginName = this.$parent.orient === 'horizontal' ? 'marginLeft' : 'marginTop'
      styles[marginName] = this.$parent.gutter + 'px'

      if (this.span) {
        for (let i = 0; i < prefixList.length; i++) {
          styles[prefixList[i] + 'flex'] = `0 0 ${this.buildWidth(this.span) * 100}%`
        }
      }
      return styles
    }
  },
  data () {
    return {
      bodyWidth: document.documentElement.offsetWidth
    }
  }
}
</script>