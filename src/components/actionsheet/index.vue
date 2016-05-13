<template>
  <div class="actionsheet_wrap">
    <div class="weui_mask_transition" :class="{'weui_fade_toggle': show}" :style="{display: show ? 'block' : 'none'}" @click="show=false"></div>
    <div class="weui_actionsheet" :class="{'weui_actionsheet_toggle': show}">
      <div class="weui_actionsheet_menu">
        <div class="weui_actionsheet_cell" v-for="(key, text) in menus" @click="emitEvent('menu-click', key)" v-html="text">
        </div>
        <div class="vux-actionsheet-gap" v-if="showCancel"></div>
        <div class="weui_actionsheet_cell vux-actionsheet-cancel" @click="emitEvent('menu-click', 'cancel')" v-if="showCancel">{{cancelText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      defalt: false,
      twoWay: true
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: 'cancel'
    },
    menus: {
      type: Object,
      required: false,
      default: {}
    }
  },
  methods: {
    emitEvent (event, menu) {
      if (event === 'menu-click') {
        this.$emit(event, menu)
        this.show = false
      }
    }
  }
}
</script>

<style>
.vux-actionsheet-gap {
  height: 8px;
  width: 100%;
  background-color: #eee;
}
.vux-actionsheet-cancel:before {
  border-top: none;
}
</style>
