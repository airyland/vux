<template>
  <div style="padding-bottom: 25px;">
    <div style="padding: 15px 15px;">
      <button-tab>
        <button-tab-item :selected="$i18n.locale() === 'zh-CN'" @click.native="$i18n.set('zh-CN')">中文</button-tab-item>
        <button-tab-item :selected="$i18n.locale() === 'en'" @click.native="$i18n.set('en')">English</button-tab-item>
      </button-tab>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { ButtonTab, ButtonTabItem } from 'vux'

export default {
  components: {
    ButtonTab,
    ButtonTabItem
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
