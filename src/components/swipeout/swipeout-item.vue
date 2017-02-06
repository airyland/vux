<template>
  <div class="vux-swipeout-item"
  @touchstart="start"
  @touchmove="move"
  @touchend="end"
  @touchcancel="end">
    <div class="vux-swipeout-button-box">
      <slot name="button"></slot>
    </div>
    <div class="vux-swipeout-content" :style="styles" @touchstart="onContentClick" ref="content">
     <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import arrayFilter from 'array-filter'

export default {
  name: 'swipeout-item',
  props: {
    buffer: {
      type: Number,
      default: 4
    },
    distance: {
      type: Number,
      default: 160
    },
    autoCloseOnButtonClick: {
      type: Boolean,
      default: true
    },
    disabled: Boolean
  },
  mounted () {
    this.$nextTick(() => {
      this.target = this.$refs.content
    })
  },
  methods: {
    onContentClick () {
      if (this.styles.transform.indexOf('(0px, 0, 0)') === -1) {
        this.setOffset(0, true)
        this.$emit('on-close')
      }
    },
    onItemClick () {
      if (this.autoCloseOnButtonClick) {
        this.setOffset(0, true)
        this.$emit('on-close')
      }
    },
    start (ev) {
      if (this.disabled) {
        return
      }
      if (ev.target.nodeName.toLowerCase() === 'button') {
        ev.preventDefault()
        return
      }
      // check if there are open items
      if (this.$parent.$options._componentTag === 'swipeout') {
        const openItems = arrayFilter(this.$parent.$children, item => {
          return item.$data.styles.transform.indexOf('(0px, 0, 0)') === -1
        })
        if (openItems.length > 0) {
          openItems.forEach(item => {
            item.setOffset(0, true)
          })
          ev.preventDefault()
          return
        }
      }
      const touch = ev.touches ? ev.touches[0] : ev
      this.pageX = touch.pageX
      this.pageY = touch.pageY
    },
    move (ev) {
      if (this.disabled) {
        return
      }
      if (ev.target.nodeName.toLowerCase() === 'button') {
        ev.preventDefault()
        return
      }
      if (this.pageX === undefined) return

      const touch = ev.touches ? ev.touches[0] : ev
      this.distX = touch.pageX - this.pageX
      this.distY = touch.pageY - this.pageY

      if (this.valid === undefined) {
        if (this.distX > 0) {
          this.valid = false
        } else if (Math.abs(this.distX) > this.buffer || Math.abs(this.distY) > this.buffer) {
          this.valid = Math.abs(this.distX) > Math.abs(this.distY)
        } else {
          ev.preventDefault()
        }
      }

      if (this.valid === true) {
        if (this.distX <= 0) {
          if (Math.abs(this.distX) <= this.distance) {
            this.setOffset(this.distX)
          } else {
            var extra = (Math.abs(this.distX) - this.distance) * 0.5
            this.setOffset(-(this.distance + extra))
          }
        }
        ev.preventDefault()
      }
    },
    end (ev) {
      if (this.disabled) {
        return
      }
      if (ev.target.nodeName.toLowerCase() === 'button') {
        ev.preventDefault()
        return
      }

      if (this.valid === true) {
        if (this.distX < -this.distance * 0.2) {
          this.setOffset(-this.distance, true) // 距离够长就展开
          this.$emit('on-open')
        } else {
          this.setOffset(0, true)
          this.$emit('on-close')
        }
      } else if (this.pageX !== undefined) {}

      this.pageX = this.pageY = this.valid = undefined
    },
    setOffset (x, animated, force) {
      if (this.disabled && !force) {
        return
      }
      if (animated && this.target) {
        this.target && this.target.classList.add('vux-swipeout-content-animated')
        var cb = (function (self, target) {
          return function () {
            target.classList.remove('animated')
            target.removeEventListener('webkitTransitionEnd', cb)
            target.removeEventListener('transitionend', cb)
          }
        })(this, this.target)

        this.target.addEventListener('webkitTransitionEnd', cb)
        this.target.addEventListener('transitionend', cb)
        this.target.classList.add('animated')
      }
      this.styles.transform = 'translate3d(' + x + 'px, 0, 0)'
    }
  },
  data () {
    return {
      pageX: undefined,
      pageY: undefined,
      distX: 0,
      distY: 0,
      animated: false,
      styles: {
        transform: 'translate3d(0px, 0, 0)'
      }
    }
  },
  watch: {
    disabled (newVal, oldVal) {
      if (newVal === true && !oldVal) {
        this.setOffset(0, true, true)
      }
    }
  }
}
</script>

<style>
.vux-swipeout-item {
  position: relative;
}
.vux-swipeout-button-box {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 0;
  text-align: right;
}
.vux-swipeout-button-box > div {
  height: 100%;
}
.vux-swipeout-button {
  height: 100%;
  text-align: center;
  font-size: 14px;
  color: #FFF;
  border: none;
}
.vux-swipeout-content {
  position: relative;
  padding: 20px 15px;
  background: #FFF;
}
.vux-swipeout-content.vux-swipeout-content-animated {
  transition: transform 0.2s;
}
</style>
