<template>
  <div class="weui_dialog_alert" v-show="show" :transition="maskTransition">
    <div class="weui_mask"></div>
    <div class="weui_dialog" v-show="show" :transition="dialogTransition">
      <div class="weui_dialog_hd"><strong class="weui_dialog_title">{{title}}</strong></div>
      <div class="weui_dialog_bd"><slot></slot></div>
      <div class="weui_dialog_ft">
        <a href="javascript:;" class="weui_btn_dialog primary" @click="onHide">{{buttonText}}</a>
      </div>
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
    onHide: function () {
      this.show = false
      this.$emit('on-hide')
    }
  },
  watch: {
    show: function (val) {
      if (val) {
        this.$emit('on-show')
      }
    }
  }
}
</script>
