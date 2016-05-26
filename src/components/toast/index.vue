<template>
  <div id="toast" v-show="show">
    <div class="weui_mask_transparent"></div>
      <div v-el:toast class="weui_toast" :class="{'weui_toast_forbidden': type == 'warn', 'weui_toast_cancel': type == 'cancel', 'weui_toast_success': type == 'success', 'weui_toast_def': !type}">
        <i class="weui_icon_toast" v-show="type"></i>
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
        // 这里用js实现未知宽度的元素水平居中，后面有更好的办法可以替换掉
        if (!_this.type) {
          const toast = _this.$els.toast
          const width = toast.offsetWidth
          const left = -(width / 2) + 'px'

          toast.style.marginLeft = left
          toast.style.opacity = '1'
        }

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
.weui_toast .weui_icon_toast:before {
  content: '';
}

#toast .weui_toast_def{
  min-height: auto;
  width: auto;
  min-width: 50px;
  max-width: 50%;
  border-radius: 26px;
  padding: .6em 1.5em;
  margin-left: auto;
  opacity: 0;
  top: 200px;
}
#toast .weui_toast_def p {
    margin: 0;
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
