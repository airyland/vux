<template>
  <div v-show="show" transition="vux-popup" :style="{height:height}" class="vux-popup">
    <slot></slot>
  </div>
</template>

<script>
import Popup from './popup'

export default {
  props: {
    show: {
      type: Boolean,
      twoWay: true
    },
    height: {
      type: String,
      default: 'auto'
    },
    hideOnBlur: {
      type: Boolean,
      default: true
    }
  },
  ready () {
    const _this = this
    this.popup = new Popup({
      container: _this.$el,
      innerHTML: '',
      hideOnBlur: _this.hideOnBlur,
      onOpen (dialog) {
        _this.fixSafariOverflowScrolling('auto')
        _this.show = true
      },
      onClose (dialog) {
        _this.show = false
        if (Object.keys(window.__$vuxPopups).length >= 1) return
        _this.fixSafariOverflowScrolling('touch')
      }
    })
    this.$overflowScrollingList = document.querySelectorAll('.vux-fix-safari-overflow-scrolling')
  },
  methods: {
    /**
    * https://github.com/airyland/vux/issues/311
    * https://benfrain.com/z-index-stacking-contexts-experimental-css-and-ios-safari/
    */
    fixSafariOverflowScrolling (type) {
      if (!this.$overflowScrollingList.length) return
      if (!/iphone/i.test(navigator.userAgent)) return
      for (let i = 0; i < this.$overflowScrollingList.length; i++) {
        this.$overflowScrollingList[i].style.webkitOverflowScrolling = type
      }
    }
  },
  data () {
    return {
      hasFirstShow: false
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.popup.show()
        this.$emit('on-show')
        if (!this.hasFirstShow) {
          this.$emit('on-first-show')
          this.hasFirstShow = true
        }
      } else {
        this.$emit('on-hide')
        this.show = false
        this.popup.hide(false)
      }
    }
  },
  beforeDestroy () {
    this.popup.destroy()
    this.fixSafariOverflowScrolling('touch')
  }
}
</script>

<style>
.vux-popup {
  border-top: 2px solid #04BE02;
}
.vux-popup-dialog {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #eee;
  z-index: 101;
  transition-property: transform;
  transition-duration: 300ms;
}
.vux-popup-mask {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  tap-highlight-color: rgba(0,0,0,0);
  z-index: -1;
}
.vux-popup-mask.vux-popup-show {
  opacity: 1;
  z-index: 100;
  transition: opacity 0.3s;
}
.vux-popup-transiton {}
.vux-popup-enter {
  transform: translate3d(0, 100%, 0);
}
.vux-popup-leave {
  transform: translate3d(0, 100%, 0);
}
</style>
