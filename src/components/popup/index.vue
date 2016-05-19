<template>
  <div v-show="show" transition="popup" :style="{height:height}" class="vux-popup">
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
      onOpen: function (dialog) {
        _this.show = true
      },
      onClose: function (dialog) {
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
    show: function (val) {
      if (val) {
        this.popup.show()
        if (!this.hasFirstShow) {
          this.$emit('on-first-show')
          this.hasFirstShow = true
        }
      } else {
        this.popup.hide()
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
.picker-dialog {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #eee;
  z-index: 101;
  -webkit-transition-property: -webkit-transform;
  transition-property: transform;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
.picker-mask {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  opacity: 0;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  z-index: -1;
}
.picker-mask.show {
  opacity: 1;
  z-index: 100;
}
.popup-transiton {
}
.popup-enter {
  background-color:red;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}
.popup-leave {
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}
</style>
