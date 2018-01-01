<template>
  <div class="vux-sticky-box">
    <slot></slot>
  </div>
</template>

<script>
import sticky from './sticky'

export default {
  name: 'sticky',
  data () {
    return {
      initTimes: 0
    }
  },
  created () {
    this.$vux && this.$vux.bus && this.$vux.bus.$on('vux:after-view-enter', this.bindSticky)
  },
  activated () {
    if (this.initTimes > 0) {
      this.bindSticky()
    }
    this.initTimes++
  },
  mounted () {
    this.$nextTick(() => {
      this.bindSticky()
    })
  },
  beforeDestroy () {
    this.$vux && this.$vux.bus && this.$vux.bus.$off('vux:after-view-enter', this.bindSticky)
  },
  methods: {
    bindSticky () {
      this.$nextTick(() => {
        sticky(this.$el, {
          scrollBox: this.scrollBox,
          offset: this.offset,
          checkStickySupport: typeof this.checkStickySupport === 'undefined' ? true : this.checkStickySupport
        })
      })
    }
  },
  props: ['scrollBox', 'offset', 'checkStickySupport']
}
</script>

<style lang="less">
@import '../../styles/variable.less';

.vux-sticky-box {
  z-index: @sticky-zindex;
}
.vux-sticky {
  width: 100%;
  position: sticky;
  top: 0;
}
.vux-fixed {
  width: 100%;
  position: fixed;
  top: 0;
  transform: translate3d(0, 0, 0);
}
.vux-sticky-fill {
  display: none;
}
.vux-fixed + .vux-sticky-fill {
  display: block;
}
</style>
