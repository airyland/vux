<template>
  <div class="vux-button-group">
    <slot></slot>
  </div>
</template>

<script>
import { parentMixin } from '../../mixins/multi-items'

export default {
  name: 'button-tab',
  mixins: [parentMixin],
  props: {
    height: Number
  }
}
</script>

<style lang="less">
@import '../../styles/variable.less';
@import '../../styles/reddot.less';
@import '../../styles/1px.less';

.setLineWithoutRight(@c: #C7C7C7) {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  height: 1px;
  border-left: 1px solid @c;
  border-top: 1px solid @c;
  border-bottom: 1px solid @c;
  color: @c;
  height: 200%;
  transform-origin: left top;
  transform: scale(0.5);
  z-index: 1;
}

.setLineWithoutLeft(@c: #C7C7C7) {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  height: 1px;
  border-right: 1px solid @c;
  border-top: 1px solid @c;
  border-bottom: 1px solid @c;
  border-left: none;
  color: @c;
  height: 200%;
  transform-origin: left top;
  transform: scale(0.5);
  /* #2322 */
  z-index: 1;
}

.setLineMiddle(@c: #C7C7C7) {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  height: 1px;
  border-right: 1px solid @c;
  border-top: 1px solid @c;
  border-bottom: 1px solid @c;
  border-left: none;
  color: @c;
  height: 200%;
  transform-origin: left top;
  transform: scale(0.5);
  z-index: 1;
}

.vux-button-group {
  -webkit-touch-callout: none;

  & {
    display: box;
    display: flex;
  }

  & > a.vux-button-tab-item-last {
    border-top-right-radius: @button-tab-border-radius * 2;
    border-bottom-right-radius: @button-tab-border-radius * 2;
    &:after {
      .setLineWithoutLeft(@button-tab-default-border-color);
      border-top-right-radius: @button-tab-border-radius * 2;
      border-bottom-right-radius: @button-tab-border-radius * 2;
    }
  }

  & > a.vux-button-tab-item-first {
    border-top-left-radius: @button-tab-border-radius * 2;
    border-bottom-left-radius: @button-tab-border-radius * 2;
    &:after {
      .setLine(@button-tab-default-border-color);
      border-top-left-radius: @button-tab-border-radius * 2;
      border-bottom-left-radius: @button-tab-border-radius * 2;
    }
  }

  & > a.vux-button-tab-item-middle {
    &:after {
      .setLineWithoutLeft(@button-tab-default-border-color);
    }
  }

  & > a  {
    &:after {
      background-clip: padding-box;
      box-sizing: border-box;
    }
    display: block;
    position: relative;
    flex: 1;
    width: 100%;
    height: @button-tab-height;
    padding: 0;
    font-size: 14px;
    line-height: @button-tab-line-height;
    text-align: center;
    color: @button-tab-default-text-color;
    white-space: nowrap;
    background: @button-tab-default-background-color;
    -webkit-tap-highlight-color: rgba(255,0,0,0);
  }

  & > a.vux-button-group-current {
    color: @button-tab-active-text-color;
    background: @button-tab-active-background-color;
  }

  & > a.vux-button-group-current:disabled,
  & > a:disabled {
    border-color: #CDCDCD;
    background: #e5e5e5;
    box-shadow: 0 1px 0 rgba(255,255,255,.6);
    text-shadow: 0 1px 0 rgba(255,255,255,.8);
    color: #aaa
  }
}

</style>
