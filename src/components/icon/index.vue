<template>
  <i :class="className"></i>
</template>

<script>
export default {
  props: {
    type: String
  },
  computed: {
    className () { // compatible with old type param
      return `weui-icon weui_icon_${this.type} weui-icon-${this.type.replace(/_/g, '-')}`
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/icon/weui_icon_font';

.icon-big:before {
  font-size: 104px;
}

.icon-small:before {
  font-size: 12px;
}
</style>
