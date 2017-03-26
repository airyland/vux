<template>
  <div class="vux-button-group">
    <slot></slot>
  </div>
</template>

<script>
import { parentMixin } from '../../mixins/multi-items'

export default {
  mixins: [parentMixin],
  props: {
    height: Number
  }
}
</script>

<style lang="less">
@import '../../styles/variable.less';
@import '../../styles/reddot.less';

.vux-button-group {
  & {
    display: box;
    display: flex;
  }

  & > a  {
    display: block;
    flex: 1;
    width: 100%;
    height: @button-tab-height;
    padding: 0;
    font-size: 14px;
    line-height: @button-tab-line-height;
    text-align: center;
    border: @button-tab-border-width solid @button-tab-default-border-color;
    border-width: @button-tab-border-width @button-tab-border-width @button-tab-border-width 0;
    color: @button-tab-default-text-color;
    white-space: nowrap;
    background: @button-tab-default-background-color;
    -webkit-tap-highlight-color: rgba(255,0,0,0);
  }

  & > a.vux-button-group-current,
  & > a.hover,
  & > a:active {
    border-color: @button-tab-border-color;
    color: @button-tab-active-text-color;
    background: @button-tab-active-background-color;
  }

  & > a:first-child {
    border-width: @button-tab-border-width;
    border-top-left-radius: @button-tab-border-radius;
    border-bottom-left-radius: @button-tab-border-radius;
    background-clip: padding-box;
  }

  & > a:last-child {
    border-top-right-radius: @button-tab-border-radius;
    border-bottom-right-radius: @button-tab-border-radius;
    background-clip: padding-box;
  }

  & > a.vux-button-group-current:disabled,
  & > a:disabled {
    border-color: #CDCDCD;
    background: #e5e5e5;
    box-shadow: 0 1px 0 rgba(255,255,255,.6);
    text-shadow: 0 1px 0 rgba(255,255,255,.8);
    color: #aaa
  }
  & .no-border-right {
    border-right-width: 0!important;
  }
}
</style>
