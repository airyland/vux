<template>
  <div class="vux-x-switch weui-cell weui-cell_switch">
    <div class="weui-cell__bd">
       <label class="weui-label" :style="labelStyle" v-html="title"></label>
      <inline-desc v-if="inlineDesc">{{inlineDesc}}</inline-desc>
    </div>
    <div class="weui-cell__ft">
      <input class="weui-switch" type="checkbox" :disabled="disabled" v-model="currentValue"/>
    </div>
  </div>
</template>

<script>
import InlineDesc from '../inline-desc'

export default {
  components: {
    InlineDesc
  },
  computed: {
    labelStyle () {
      let isHTML = /<\/?[^>]*>/.test(this.title)
      let width = Math.min(isHTML ? 5 : (this.title.length + 1), 14) + 'em'
      return {
        display: 'block',
        width
      }
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    disabled: Boolean,
    value: {
      type: Boolean,
      default: false
    },
    inlineDesc: [String, Boolean, Number]
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    currentValue (val) {
      this.$emit('input', val)
      this.$emit('on-change', val)
    },
    value (val) {
      this.currentValue = val
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_cell/weui_form/weui_form_common';
@import '../../styles/weui/widget/weui_cell/weui_switch';

.weui-cell_switch .weui-cell__ft {
  font-size: 0;
}

input.weui-switch[disabled] {
  opacity: @switch-disabled-opacity;
}

.vux-x-switch.weui-cell_switch {
  padding-top: 6px;
  padding-bottom: 6px;
}
</style>
