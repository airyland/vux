<template>
  <div class="vux-form-preview weui-form-preview">
    <div class="weui-form-preview__hd">
      <label class="weui-form-preview__label" v-html="headerLabel"></label>
      <em class="weui-form-preview__value" v-html="headerValue || '&nbsp;'"></em>
    </div>
    <div class="weui-form-preview__bd">
      <div class="weui-form-preview__item" v-for="item in bodyItems">
        <label class="weui-form-preview__label">{{$t(item.label)}}</label>
        <span class="weui-form-preview__value">{{$t(item.value)}}</span>
      </div>
    </div>
    <div class="weui-form-preview__ft">
      <a class="weui-form-preview__btn" :class="{'weui-form-preview__btn_default': button.style==='default', 'weui-form-preview__btn_primary': button.style === 'primary'}" href="javascript:" v-for="button in footerButtons" @click="onButtonClick(button.onButtonClick, button.link)">{{$t(button.text)}}</a>
    </div>
  </div>
</template>

<script>
import { go } from '../../libs/router'

export default {
  name: 'form-preview',
  props: ['headerLabel', 'headerValue', 'bodyItems', 'footerButtons', 'name'],
  methods: {
    onButtonClick (cb, link) {
      cb && cb(this.name)
      if (link) {
        go(link, this.$router)
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_cell/weui_form/weui-form-preview.less';
.vux-form-preview {
  overflow: hidden;
}
</style>
