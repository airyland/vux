<template>
  <div class="weui-cell" :class="{'vux-tap-active': isLink || !!link, 'weui-cell_access': isLink || !!link}" @click="onClick">
    <div class="weui-cell__hd">
      <slot name="icon"></slot>
    </div>
    <div class="vux-cell-bd" :class="{'vux-cell-primary':primary==='title'}">
      <p>
        <label class="vux-label" :style="{width: $parent.labelWidth, textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}" v-if="title">{{title}}</label>
        <slot name="after-title"></slot>
      </p>
      <inline-desc>{{inlineDesc}}</inline-desc>
    </div>
    <div class="weui-cell__ft" :class="{'vux-cell-primary':primary==='content'}">
      <slot name="value"></slot>
      <slot>{{value}}</slot>
      <i class="weui-loading" v-if="isLoading"></i>
    </div>
    <slot name="child"></slot>
  </div>
</template>

<script>
import InlineDesc from '../inline-desc'
import { go } from '../../libs/router'

export default {
  components: {
    InlineDesc
  },
  props: {
    title: String,
    value: [String, Number, Array],
    isLink: Boolean,
    isLoading: Boolean,
    inlineDesc: [String, Number],
    primary: {
      type: String,
      default: 'title'
    },
    link: {
      type: [String, Object]
    }
  },
  methods: {
    onClick () {
      go(this.link, this.$router)
    }
  }
}
</script>

<style lang="less">
@import '../../styles/variable.less';
@import '../../styles/tap.less';
@import '../../styles/weui/base/mixin/setArrow.less';
@import '../../styles/weui/widget/weui_cell/weui_cell_global';
@import '../../styles/weui/widget/weui-loading/weui-loading.less';

.vux-cell-primary {
  flex: 1;
}
.vux-label {
  display: block;
  word-wrap: break-word;
  word-break: break-all;
}
.weui-cell__ft .weui-loading {
  display: block;
}
</style>
