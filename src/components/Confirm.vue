<template>
  <div class="weui_dialog_confirm" v-show="show">
    <div class="weui_mask"></div>
    <div class="weui_dialog">
      <div class="weui_dialog_hd"><strong class="weui_dialog_title">{{title}}</strong></div>
      <div class="weui_dialog_bd"><slot></slot></div>
      <div class="weui_dialog_ft">
        <a href="javascript:;" class="weui_btn_dialog default" @click="onCancel">{{cancelText}}</a>
        <a href="javascript:;" class="weui_btn_dialog primary" @click="onConfirm">{{confirmText}}</a>
      </div>
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
    title: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      default: 'confirm'
    },
    cancelText: {
      type: String,
      default: 'cancel'
    }
  },
  methods: {
    onConfirm: function () {
      this.show = false
      this.$dispatch('confirm')
    },
    onCancel: function () {
      this.show = false
      this.$dispatch('cancel')
    }
  },
  watch: {
    show: function (val) {
      if (val) {
        this.$dispatch('show')
      }
    }
  }
}
</script>