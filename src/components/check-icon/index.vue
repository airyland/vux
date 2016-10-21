<template>
  <div class="vux-check-icon" @click="value = !value">
    <icon type="success" v-show="type === 'default' && value"></icon>
    <icon type="success_circle" v-show="type === 'plain' && value"></icon>
    <icon type="circle" v-show="!value"></icon>
    <span><slot></slot></span>
  </div>
</template>

<script>
import Icon from '../icon'

export default {
  components: {
    Icon
  },
  props: {
    value: Boolean,
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
}
.vux-check-icon span {
  line-height: 20px;
  color: #222;
  vertical-align: bottom;
}
.vux-check-icon > .weui_icon_success:before, .vux-check-icon > .weui_icon_success_circle:before {
  color: @check-icon-color-checked;
}
</style>


