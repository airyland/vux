<template>
  <div>
    <div
    class="weui-cells__title"
    v-if="title"
    :style="cleanStyle({
      color: titleColor
    })"
    v-html="title"></div>
    <slot name="title"></slot>
    <div
    class="weui-cells"
    :class="{
      'vux-no-group-title': !title
    }"
    :style="cleanStyle({
      marginTop: typeof gutter === 'number' ? (gutter + 'px') : gutter
    })">
      <slot name="after-title"></slot>
      <slot></slot>
    </div>
    <div
    class="weui-cells__title vux-group-footer-title"
    v-if="footerTitle"
    :style="cleanStyle({
      color: footerTitleColor
    })"
    v-html="footerTitle"></div>
  </div>
</template>

<script>
import cleanStyle from '../../libs/clean-style'

export default {
  name: 'group',
  methods: {
    cleanStyle
  },
  props: {
    title: String,
    titleColor: String,
    labelWidth: String,
    labelAlign: String,
    labelMarginRight: String,
    gutter: [String, Number],
    footerTitle: String,
    footerTitleColor: String
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

.vux-group-footer-title.weui-cells__title {
  margin-top: @group-footer-title-margin-top;
  margin-bottom: @group-footer-title-margin-bottom;
  padding-top: 0;
  font-size: 12px;
}

/* global config for group items */
.vux-cell-value {
  color: @cell-value-color;
}
.vux-cell-placeholder {
  color: @cell-placeholder-color;
}
</style>
