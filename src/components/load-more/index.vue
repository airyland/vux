<template>
  <div class="weui-loadmore" :class="{'weui-loadmore_line':!showLoading, 'weui-loadmore_dot': !showLoading && !tip}">
    <i class="weui-loading" v-if="showLoading"></i>
    <span class="weui-loadmore__tips" :style="getStyle()" v-show="tip || !showLoading">{{tip}}</span>
  </div>
</template>

<script>
export default {
  props: {
    showLoading: {
      type: Boolean,
      default: true
    },
    tip: String,
    backgroundColor: String
  },
  methods: {
    getStyle () {
      if (!this.showLoading && this.tip) {
        return {
          'background-color': this.backgroundColor
        }
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui-loading/weui-loading.less';
@import '../../styles/weui/widget/weui_tips/weui-loadmore.less';
</style>