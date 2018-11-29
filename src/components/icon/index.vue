<template>
  <i :class="className"></i>
</template>

<script>
export default {
  name: 'icon',
  props: {
    type: {
      type: String,
      required: true
    },
    isMsg: Boolean
  },
  computed: {
    className () { // compatible with old type param
      return {
        'weui-icon': true,
        [` weui_icon_${this.type}`]: true,
        [`weui-icon-${this.type.replace(/_/g, '-')}`]: true,
        'weui-icon_msg': !!this.isMsg
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/icon/weui_icon_font';

/**
following styles will be removed after v3.0.0
*/
.icon-big:before {
  font-size: 93px;
}
</style>
