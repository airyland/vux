<template>
  <div class="weui_dialog_alert" v-show="show" :transition="maskTransition">
    <div class="weui_mask" @click="autoClose&&show=false"></div>
    <div class="weui_dialog" v-show="show" :transition="dialogTransition">
      <slot></slot>
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
    maskTransition: {
      type: String,
      default: 'vux-fade'
    },
    dialogTransition: {
      type: String,
      default: 'vux-dialog'
    },
    autoClose:{ //点击遮罩层后自动关闭对话框组件
      type:Boolean,
      default:false
    }
  },
  watch: {
    show (val) {
      this.$emit(val ? 'on-show' : 'on-hide')
    }
  }
}
</script>
