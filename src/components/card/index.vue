<template>
	<div class="weui-panel weui-panel_access">
    <div class="weui-panel__hd" v-if="header && header.title" v-html="header.title" @click="$emit('on-click-header')"></div>
    <slot name="header"></slot>
    <div class="weui-panel__bd">
      <div class="vux-card-content"><slot name="content"></slot></div>
    </div>
    <div class="weui-panel__ft">
      <a class="weui-cell weui-cell_access weui-cell_link" href="javascript:" v-if="footer && footer.title" @click="onClickFooter">
        <div class="weui-cell__bd" v-html="footer.title"></div>
      </a>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import { go } from '../../libs/router'

export default {
  name: 'card',
  props: {
    header: Object,
    footer: Object
  },
  methods: {
    onClickFooter () {
      this.footer.link && go(this.footer.link, this.$router)
      this.$emit('on-click-footer')
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_cell/weui_cell_global';
@import '../../styles/weui/widget/weui_cell/weui_access';
@import '../../styles/weui/widget/weui_panel/weui_panel';
</style>
