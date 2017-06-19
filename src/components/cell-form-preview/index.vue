<template>
  <div class="weui-cell vux-cell-form-preview" :class="{'vux-cell-no-border-intent': !borderIntent}">
    <div class="weui-form-preview__bd">
      <div class="weui-form-preview__item" v-for="item in list">
        <label class="weui-form-preview__label" v-html="$t(item.label)"></label>
        <span class="weui-form-preview__value" v-html="$t(item.value)"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cell-form-preview',
  props: {
    list: Array,
    borderIntent: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_cell/weui_cell_global';
@import '../../styles/weui/widget/weui_cell/weui_form/weui-form-preview.less';

.vux-cell-form-preview .weui-form-preview__bd {
  width: 100%;
  padding: 0;
}
</style>

