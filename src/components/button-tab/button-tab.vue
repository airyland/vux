<template>
  <div class="vux-button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: Number
    }
  },
  ready () {
    const tabList = this.$el.querySelectorAll('.vux-button-tab-item')
    this.tabNumber = tabList.length
    let n = 0
    for (let i of tabList) {
      i.setAttribute('data-index', n)
      n++
    }
  },
  events: {
    'on-item-click': function (index) {
      this.$broadcast('on-item-click', index)
      return true
    }
  }
}
</script>

<style lang="less">
@import '../variable.less';

.vux-button-group {
  & {
    display: box;
    display: flex;
  }

  & > a  {
    display: block;
    flex: 1;
    width: 100%;
    height: 30px;
    padding: 0;
    font-size: 14px;
    line-height: 31px;
    text-align: center;
    border: 1px solid #d2d2d2;
    border-width: 1px 1px 1px 0;
    color: #999;
    white-space: nowrap;
    background: #fdfdfd
  }

  & > a.vux-button-group-current,
  & > a.hover,
  & > a:active {
    border-color: @color-wechat-green;
    color: #FFF;
    background: @color-wechat-green
  }

  & > a:first-child {
    border-width: 1px;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    background-clip: padding-box
  }

  & > a:last-child {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
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
