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
      type: Number
    }
  },
  computed: {
    style: function () {
      let styles = {
        marginLeft: this.$parent.supported ? this.$parent.marginLeft + 'px' : 0
      }
      if (this.span) {
        for (let i = 0; i < prefixList.length; i++) {
          styles[prefixList[i] + 'flex'] = `0 0 ${(this.span >= 1 ? this.span / 12 : this.span) * 100}%`
        }
      }
      return styles
    }
  }
}
</script>