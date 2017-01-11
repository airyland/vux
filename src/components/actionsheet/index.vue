<template>
  <div class="vux-actionsheet">
    <div class="weui_mask_transition" :class="{'weui_fade_toggle': show}" :style="{display: show ? 'block' : 'none'}" @click="onClickingMask"></div>
    <div class="weui_actionsheet" :class="{'weui_actionsheet_toggle': show}">
      <div class="weui_actionsheet_menu">
        <div class="weui_actionsheet_cell" v-for="(text, key) in menus" @click="emitEvent('on-click-menu', key)" v-html="$t(text)">
        </div>
        <div class="vux-actionsheet-gap" v-if="showCancel"></div>
        <div class="weui_actionsheet_cell vux-actionsheet-cancel" @click="emitEvent('on-click-menu', 'cancel')" v-if="showCancel">{{cancelText || $t('cancel')}}</div>
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
      this.$tabbar = document.querySelector('.weui_tabbar')
    })
  },
  props: {
    value: Boolean,
    showCancel: Boolean,
    cancelText: String,
    menus: {
      type: Object,
      default: () => {}
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
    onClickingMask () {
      this.closeOnClickingMask && (this.show = false)
    },
    emitEvent (event, menu) {
      if (event === 'on-click-menu' && !/.noop/.test(menu)) {
        this.$emit(event, menu)
        this.$emit(`${event}-${menu}`)
        this.show = false
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
    value (val) {
      this.show = val
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
</style>
