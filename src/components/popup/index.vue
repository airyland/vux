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
      default: false,
      twoWay: true
    },
    height: {
      type: String,
      default: 'auto'
    }
  },
  ready () {
    var _this = this
    this.popup = new Popup({
      container: _this.$el,
      innerHTML: '',
      onOpen (dialog) {
        _this.show = true
      },
      onClose (dialog) {
        _this.show = false
      }
    })
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
  z-index: 1;
  opacity: 0;
  tap-highlight-color: rgba(0,0,0,0);
  transition: all 0.2s;
  z-index: -1;
}
.vux-popup-mask.vux-popup-show {
  opacity: 1;
  z-index: 100;
}
.vux-popup-transiton {
}
.vux-popup-enter {
  background-color:red;
  transform: translate3d(0, 100%, 0);
}
.vux-popup-leave {
  transform: translate3d(0, 100%, 0);
}
</style>
