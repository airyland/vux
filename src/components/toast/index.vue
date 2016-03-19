<template>
  <div id="toast" v-show="show">
    <div class="weui_mask_transparent"></div>
      <div class="weui_toast">
        <i class="weui_icon_toast"></i>
        <p class="weui_toast_content"><slot></slot></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
      twoWay: true
    },
    time: {
      type: Number,
      default: 2000
    }
  },
  watch: {
    show: function (val) {
      const _this = this
      if (val) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(function () {
          _this.show = false
        }, _this.time)
      }
    }
  }
}
</script>