<template>
  <div class="vux-x-dialog">
    <transition :name="maskTransition">
      <div class="weui-mask" @click="hide" v-show="show"></div>
    </transition>
    <transition :name="dialogTransition">
      <div :class="dialogClass" v-show="show" :style="dialogStyle">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import dom from '../../libs/dom'

export default {
  name: 'x-dialog',
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: 'vux-mask'
    },
    dialogTransition: {
      type: String,
      default: 'vux-dialog'
    },
    dialogClass: {
      type: String,
      default: 'weui-dialog'
    },
    hideOnBlur: Boolean,
    dialogStyle: Object,
    scroll: {
      type: Boolean,
      default: true,
      validator (val) {
        if (process.env.NODE_ENV === 'development' && val === false) {
          console.warn('[VUX warn] x-dialog:scroll 已经废弃。如果你是 100% 布局，请参照文档配置 $layout 以实现阻止滚动')
        }
        return true
      }
    }
  },
  data () {
    return {
      layout: ''
    }
  },
  created () {
    // get global layout config
    if (this.$vux && this.$vux.config && this.$vux.config.$layout === 'VIEW_BOX') {
      this.layout = 'VIEW_BOX'
    }
  },
  watch: {
    show (val) {
      this.$emit('update:show', val)
      this.$emit(val ? 'on-show' : 'on-hide')
      if (val) {
        console.log('show true')
        this.layout === 'VIEW_BOX' && dom.addClass(document.body, 'vux-modal-open')
      } else {
        this.removeModalClassName()
      }
    }
  },
  methods: {
    hide () {
      if (this.hideOnBlur) {
        this.$emit('update:show', false)
        this.$emit('change', false)
      }
    },
    removeModalClassName () {
      this.layout === 'VIEW_BOX' && dom.removeClass(document.body, 'vux-modal-open')
    }
  },
  beforeDestroy () {
    this.removeModalClassName()
  },
  deactivated () {
    this.removeModalClassName()
  }
}
</script>

<style lang="less">
@import '../../styles/transition.less';
@import '../../styles/weui/widget/weui_tips/weui_mask';
@import '../../styles/weui/widget/weui_tips/weui_dialog';

.vux-modal-open {
  overflow: hidden;
  position: fixed;
  width: 100%;
}
</style>
