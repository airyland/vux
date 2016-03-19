<template>
  <div class="weui_dialog_alert" id="dialog2" v-show="show">
    <div class="weui_mask"></div>
    <div class="weui_dialog">
        <div class="weui_dialog_hd"><strong class="weui_dialog_title">{{title}}</strong></div>
        <div class="weui_dialog_bd"><slot></slot></div>
        <div class="weui_dialog_ft">
          <a href="javascript:;" class="weui_btn_dialog primary" @click="onHide">{{text}}</a>
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
    text: {
      type: String,
      default: 'OK'
    }
  },
  methods: {
    onHide: function () {
      this.show = false
      this.$dispatch('hide')
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