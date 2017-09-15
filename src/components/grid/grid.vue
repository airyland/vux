<template>
  <div class="weui-grids">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'grid',
  methods: {
    countColumn () {
      this.childrenSize = this.$children.length
    }
  },
  props: {
    rows: {
      type: Number,
      validator () {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[VUX warn] Grid rows 属性已经废弃，目前列数为自动计算')
        }
        return true
      }
    },
    col: {
      type: Number
    }
  },
  computed: {
    column () {
      return this.col || this.childrenSize
    }
  },
  data () {
    return {
      childrenSize: 3
    }
  }
}
</script>
<style lang="less">
@import '../../styles/weui/widget/weui-grid/weui-grid.less';
</style>
