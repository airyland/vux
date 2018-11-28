<template>
  <div
    class="weui-grids"
    :class="{
      'vux-grid-no-lr-borders': !showLrBorders
    }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'grid',
  methods: {
    countColumn () {
      this.childrenSize = this.$children.length
      this.$children.forEach((c, index) => (c.index = index))
    }
  },
  props: {
    rows: {
      type: Number,
      validator () {
        /* istanbul ignore if */
        if (process.env.NODE_ENV === 'development') {
          console.warn('[VUX warn] Grid rows 属性已经废弃，使用 cols 代替。单行列数为自动计算')
        }
        return true
      }
    },
    cols: {
      type: Number
    },
    showLrBorders: {
      type: Boolean,
      default: true
    },
    showVerticalDividers: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    column () {
      return this.cols || this.childrenSize
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

.weui-grids.vux-grid-no-lr-borders {
  &:after {
    display: none;
  }
}
</style>
