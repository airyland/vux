<template>
  <div class="vux-toast">
    <div class="weui_mask_transparent" v-show="show"></div>
      <div class="weui_toast" :style="{width: width}" :class="toastClass" v-show="show" :transition="transition">
        <i class="weui_icon_toast" v-show="type !== 'text'"></i>
        <p class="weui_toast_content" v-if="text" v-html="text"></p>
        <p class="weui_toast_content" v-else><slot></slot></p>
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
    },
    text: String
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
          this.$emit('on-hide')
        }, this.time)
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/transition.less';
@import '../../styles/weui/widget/weui_tips/weui_mask';
@import '../../styles/weui/icon/weui_icon_font';
@import '../../styles/weui/widget/weui_tips/weui_toast';

.weui_toast {
  transform: translateX(-50%);
  margin-left: 0!important;
}
.weui_toast_forbidden {
  color: #F76260;
}
.weui_toast.weui_toast_text{
  min-height: 0;
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
