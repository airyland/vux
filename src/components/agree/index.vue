<template>
  <label :for="`vux-agree-${uuid}`" class="weui-agree">
    <input :id="`vux-agree-${uuid}`" type="checkbox" v-model="currentValue" class="weui-agree__checkbox">
    <span class="weui-agree__text">
      <slot></slot>
    </span>
  </label>
</template>

<script>
import uuidMixin from '../../mixins/uuid'

export default {
  name: 'agree',
  mixins: [uuidMixin],
  props: {
    value: Boolean
  },
  created () {
    this.currentValue = this.value
  },
  data () {
    return {
      currentValue: false
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui-agree/weui-agree.less';
</style>