<template>
  <div class="vux-check-icon" @click="value = !value">
    <icon type="success" v-show="type === 'default' && value"></icon>
    <icon type="success_circle" v-show="type === 'plain' && value"></icon>
    <icon type="circle" v-show="!value"></icon>
  </div>
</template>

<script>
import Icon from '../icon'

export default {
  components: {
    Icon
  },
  props: {
    value: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'default'
    }
  }
}
</script>

<style lang="less">
@import '../../styles/variable.less';

.vux-check-icon {
  display: inline-block;
  width: 25px;
}
.vux-check-icon > .weui_icon_success:before, .vux-check-icon > .weui_icon_success_circle:before {
  color: @check-icon-color-checked;
}
</style>


