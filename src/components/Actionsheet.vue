<template>
  <div class="actionsheet_wrap">
    <div class="weui_mask_transition" :class="{'weui_fade_toggle': show}" :style="{display: show ? 'block' : 'none'}" @click="show=false"></div>
    <div class="weui_actionsheet" :class="{'weui_actionsheet_toggle': show}">
      <div class="weui_actionsheet_menu">
        <div class="weui_actionsheet_cell" v-for="(key, text) in menus" @click="dispatchEvent('menu-click', key)">
          {{{text}}}
        </div>
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
    menus: {
      type: Object,
      required: false,
      default: {}
    }
  },
  methods: {
    dispatchEvent (event, message) {
      if (event === 'menu-click') {
        this.$dispatch(event, message)
        this.show = false
      }
    }
  }
}
</script>