<template>
  <dialog class="weui_dialog_alert"
  :show="show"
  :mask-transition="maskTransition"
  :dialog-transition="dialogTransition"
  @on-hide="$emit('on-hide')"
  @on-show="$emit('on-show')">
    <div class="weui_dialog_hd"><strong class="weui_dialog_title">{{title}}</strong></div>
    <div class="weui_dialog_bd"><slot></slot></div>
    <div class="weui_dialog_ft">
      <a href="javascript:;" class="weui_btn_dialog primary" @click="onHide">{{buttonText}}</a>
    </div>
  </dialog>
</template>

<script>
import Dialog from '../dialog'

export default {
  components: {
    Dialog
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      default: 'OK'
    },
    maskTransition: {
      type: String,
      default: 'vux-fade'
    },
    dialogTransition: {
      type: String,
      default: 'vux-dialog'
    }
  },
  methods: {
    onHide () {
      this.show = false
    }
  }
}
</script>
