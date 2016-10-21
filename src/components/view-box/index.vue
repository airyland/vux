<template>
  <div class="weui_tab">
    <slot name="header"></slot>
    <div class="weui_tab_bd vux-fix-safari-overflow-scrolling" v-el:view-box-body>
      <slot></slot>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<style lang="less">
@import '../../styles/weui/widget/weui_tab/weui_tab_tabbar';
</style>
