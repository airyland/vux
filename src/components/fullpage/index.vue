<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import Fullpage from './lib'

export default {
  name: 'fullpage',
  mounted () {
    const self = this
    this.$nextTick(() => {
      this._fullpage = new Fullpage(this.$el, {
        dir: self.dir,
        loop: self.loop,
        drag: self.drag,
        start: self.start,
        duration: self.duration,
        page: self.page,
        der: self.der,
        change: function (data) {
          self.$emit('on-change', data)
        },
        beforeChange: function (data) {
          self.$emit('on-before-change', data)
        },
        afterChange: function (data) {
          self.$emit('on-after-change', data)
        },
        orientationchange: function (orientation) {
          self.$emit('on-orientation-change', orientation)
        }
      })
    })
  },
  props: {
    page: String,
    start: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 500
    },
    loop: Boolean,
    drag: Boolean,
    dir: {
      type: String,
      default: 'v'
    },
    der: {
      type: Number,
      default: 0.1
    }
  }
}
</script>

<style lang="less">
.vux-fullpage-box {
  transform: translate3d(0, 0, 0);
}

.vux-fullpage-box:after {
  display: block;
  content: ' ';
  height: 0;
  clear: both;
}

.vux-fullpage-box.vux-fullpage-box-anim {
  transition: all 500ms ease-out 0s;
}

.vux-fullpage-item {
  display: block;
  overflow: hidden;
}

.vux-fullpage-dir-h {
  float: left;
}
</style>
