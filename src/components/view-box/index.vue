<template>
  <div class="weui_tab">
    <slot name="header"></slot>
    <div class="weui_tab_bd vux-fix-safari-overflow-scrolling" ref="viewBoxBody">
      <slot></slot>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script>
export default {
  methods: {
    scrollTo (top) {
      this.$refs.viewBoxBody.scrollTop = top
    },
    getScrollTop () {
      return this.$refs.viewBoxBody.scrollTop
    },
    getScrollBody () {
      return this.$refs.viewBoxBody
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_tab/weui_tab_tabbar';
</style>
