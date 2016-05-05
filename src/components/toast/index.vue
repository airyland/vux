<template>
  <div id="toast" v-show="show">
    <div class="weui_mask_transparent"></div>
      <div class="weui_toast" :class="{'weui_toast_forbidden': type == 'warn', 'weui_toast_cancel': type == 'cancel'}">
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
      default: false
    },
    time: {
      type: Number,
      default: 2000
    },
    type: {
      type: String,
      default: ''
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
<style>
.weui_toast_forbidden {
  color: #F76260;
}
.weui_toast_cancel .weui_icon_toast:before {
  content: "\EA0D";
}
.weui_toast_forbidden .weui_icon_toast:before {
  content: "\EA0B";
  color: #F76260;
}
</style>
