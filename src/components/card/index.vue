<template>
	<div class="weui_panel weui_panel_access">
    <div class="weui_panel_hd" v-if="header && header.title" v-html="header.title"></div>
    <slot name="header"></slot>
    <div class="weui_panel_bd">
      <div class="vux-card-content"><slot name="content"></slot></div>
    </div>
    <a class="weui_panel_ft" href="javascript:" v-if="footer && footer.title" v-html="footer.title" @click="onClickFooter"></a>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import { go } from '../../libs/router'

export default {
  props: {
    header: Object,
    footer: Object
  },
  methods: {
    onClickFooter () {
      this.footer.link && go(this.footer.link, this.$router)
    }
  }
}
</script>
