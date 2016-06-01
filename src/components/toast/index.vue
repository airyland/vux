<template>
  <div v-show="show" class="vux-toast" :transition="transition">
    <div class="weui_mask_transparent"></div>
      <div class="weui_toast" :style="{width: width}" :class="toastClass">
        <i class="weui_icon_toast" v-show="type !== 'text'"></i>
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
      default: 'success'
    },
    transition: {
      type: String,
      default: 'vux-fade'
    },
    width: {
      type: String,
      default: '7.6em'
    }
  },
  computed: {
    toastClass () {
      return {
        'weui_toast_forbidden': this.type === 'warn',
        'weui_toast_cancel': this.type === 'cancel',
        'weui_toast_success': this.type === 'success',
        'weui_toast_text': this.type === 'text'
      }
    }
  },
  watch: {
    show (val) {
      if (val) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.show = false
        }, this.time)
      }
    }
  }
}
</script>
<style>
.weui_toast {
  z-index: 200;
  transform: translateX(-50%);
  margin-left: 0;
}
.weui_toast_forbidden {
  color: #F76260;
}
.weui_toast.weui_toast_text{
  min-height: auto;
}
.weui_toast_text .weui_toast_content {
  margin: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 15px;
}
.weui_toast_success .weui_icon_toast:before {
  content: "\EA08";
}
.weui_toast_cancel .weui_icon_toast:before {
  content: "\EA0D";
}
.weui_toast_forbidden .weui_icon_toast:before {
  content: "\EA0B";
  color: #F76260;
}
</style>
