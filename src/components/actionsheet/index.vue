<template>
  <div class="vux-actionsheet">
    <transition name="vux-actionsheet-mask">
      <div class="weui-mask weui-mask_transparent" @click="onClickingMask" v-show="show"></div>
    </transition>
    <div class="weui-actionsheet" :class="{'weui-actionsheet_toggle': show}">
      <div class="weui-actionsheet__menu">
        <div class="weui-actionsheet__cell" v-for="(text, key) in menus" @click="onMenuClick(text, key)" v-html="$t(text.label || text)" :class="`vux-actionsheet-menu-${text.type || 'default'}`">
        </div>
      </div>
      <div class="weui-actionsheet__action" @click="emitEvent('on-click-menu', 'cancel')" v-if="showCancel">
        <div class="weui-actionsheet__cell">{{cancelText || $t('cancel')}}</div>
      </div>
    </div>
  </div>
</template>

<i18n>
cancel:
  en: cancel
  zh-CN: 取消
</i18n>

<script>
export default {
  mounted () {
    this.$nextTick(() => {
      this.$tabbar = document.querySelector('.weui-tabbar')
    })
  },
  props: {
    value: Boolean,
    showCancel: Boolean,
    cancelText: String,
    menus: {
      type: [Object, Array],
      default: () => ({})
    },
    closeOnClickingMask: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    onMenuClick (text, key) {
      if (typeof text === 'string') {
        this.emitEvent('on-click-menu', key)
      } else {
        if (text.type !== 'disabled' && text.type !== 'info') {
          if (text.value) {
            this.emitEvent('on-click-menu', text.value)
          } else {
            this.show = false
          }
        }
      }
    },
    onClickingMask () {
      this.closeOnClickingMask && (this.show = false)
    },
    emitEvent (event, menu, shouldClose = true) {
      if (event === 'on-click-menu' && !/.noop/.test(menu)) {
        this.$emit(event, menu)
        this.$emit(`${event}-${menu}`)
        shouldClose && (this.show = false)
      }
    },
    fixIos (zIndex) {
      if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {
        this.$tabbar.style.zIndex = zIndex
      }
    }
  },
  watch: {
    show (val) {
      this.$emit('input', val)
      if (val) {
        this.fixIos(-1)
      } else {
        setTimeout(() => {
          this.fixIos(100)
        }, 200)
      }
    },
    value: {
      handler: function (val) {
        this.show = val
      },
      immediate: true
    }
  },
  beforeDestroy () {
    this.fixIos(100)
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_tips/weui_mask';
@import '../../styles/weui/widget/weui_tips/weui_actionsheet';

.vux-actionsheet-gap {
  height: 8px;
  width: 100%;
  background-color: #eee;
}
.vux-actionsheet-cancel:before {
  border-top: none;
}
.vux-actionsheet-menu-primary {
  color: @actionsheet-label-primary-color;
}
.vux-actionsheet-menu-warn {
  color: @actionsheet-label-warn-color;
}
.vux-actionsheet-menu-default {
  color: @actionsheet-label-default-color;
}
.vux-actionsheet-menu-disabled {
  color: @actionsheet-label-disabled-color;
}
.vux-actionsheet-mask-enter, .vux-actionsheet-mask-leave-active {
  opacity: 0;
}
.vux-actionsheet-mask-leave-active, .vux-actionsheet-mask-enter-active {
  transition: opacity 300ms;
}
</style>
