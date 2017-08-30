<template>
  <div>
    <div class="weui-cells__title" v-if="title" :style="{color:titleColor}" v-html="title"></div>
    <slot name="title"></slot>
    <div class="weui-cells" :class="{'vux-no-group-title':!title}" :style="{marginTop: typeof gutter === 'number' ? (gutter + 'px') : gutter}">
      <slot name="after-title"></slot>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'group',
  props: {
    title: String,
    titleColor: String,
    labelWidth: String,
    labelAlign: String,
    labelMarginRight: String,
    gutter: [String, Number]
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_cell/weui_access';
@import '../../styles/weui/widget/weui_cell/weui_cell_global';
@import '../../styles/blank.less';

.vux-no-group-title {
  margin-top: @group-title-margin-top;
}

/* global config for group items */
.vux-cell-value {
  color: @cell-value-color;
}
.vux-cell-placeholder {
  color: @cell-placeholder-color;
}
</style>
