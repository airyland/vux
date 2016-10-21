<template>
  <div class="vux-actionsheet">
    <div class="weui_mask_transition" :class="{'weui_fade_toggle': show}" :style="{display: show ? 'block' : 'none'}" @click="show=false"></div>
    <div class="weui_actionsheet" :class="{'weui_actionsheet_toggle': show}">
      <div class="weui_actionsheet_menu">
        <div class="weui_actionsheet_cell" v-for="(key, text) in menus" @click="emitEvent('on-click-menu', key)" v-html="text">
        </div>
        <div class="vux-actionsheet-gap" v-if="showCancel"></div>
        <div class="weui_actionsheet_cell vux-actionsheet-cancel" @click="emitEvent('on-click-menu', 'cancel')" v-if="showCancel">{{cancelText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  ready () {
    this.$tabbar = document.querySelector('.weui_tabbar')
  },
  props: {
    show: Boolean,
    showCancel: Boolean,
    cancelText: {
      type: String,
      default: 'cancel'
    },
    menus: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
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
      if (val) {
        this.fixIos(-1)
      } else {
        setTimeout(() => {
          this.fixIos(100)
        }, 200)
      }
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
