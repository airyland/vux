<template>
  <div class="vux-toast">
    <div class="weui-mask_transparent" v-show="isShowMask && show"></div>
    <transition :name="transition">
      <div class="weui-toast" :style="{width: width}" :class="toastClass" v-show="show">
        <i class="weui-icon-success-no-circle weui-icon_toast" v-show="type !== 'text'"></i>
        <p class="weui-toast__content" v-if="text" :style="style" v-html="$t(text)"></p>
        <p class="weui-toast__content" v-else><slot></slot></p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
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
    isShowMask: {
      type: Boolean,
      default: false
    },
    text: String
  },
  data () {
    return {
      show: false
    }
  },
  created () {
    if (this.value) {
      this.show = true
    }
  },
  computed: {
    toastClass () {
      return {
        'weui-toast_forbidden': this.type === 'warn',
        'weui-toast_cancel': this.type === 'cancel',
        'weui-toast_success': this.type === 'success',
        'weui-toast_text': this.type === 'text'
      }
    },
    style () {
      if (this.type === 'text' && this.width === 'auto') {
        return { padding: '10px' }
      }
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.$emit('input', true)
        this.$emit('on-show')
      }
      if (val) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.show = false
          this.$emit('input', false)
          this.$emit('on-hide')
        }, this.time)
      }
    },
    value (val) {
      this.show = val
    }
  }
}
</script>

<style lang="less">
@import '../../styles/transition.less';
@import '../../styles/weui/widget/weui_tips/weui_mask';
@import '../../styles/weui/icon/weui_icon_font';
@import '../../styles/weui/widget/weui_tips/weui_toast';

.weui-toast {
  transform: translateX(-50%);
  margin-left: 0!important;
}
.weui-toast_forbidden {
  color: #F76260;
}
.weui-toast.weui-toast_text{
  min-height: 0;
}
.weui-toast_text .weui-toast__content {
  margin: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 15px;
}
.weui-loading_toast .weui-toast__content {
  margin-top: 0;
}
.weui-toast_success .weui-icon_toast:before {
  content: "\EA08";
}
.weui-toast_cancel .weui-icon_toast:before {
  content: "\EA0D";
}
.weui-toast_forbidden .weui-icon_toast:before {
  content: "\EA0B";
  color: #F76260;
}
</style>
