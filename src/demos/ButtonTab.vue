<template>
  <div>
    <div style="padding: 15px;">
      <button-tab>
        <button-tab-item>{{ $t('Today') }}</button-tab-item>
        <button-tab-item selected>{{ $t('This Week') }}</button-tab-item>
        <button-tab-item>{{ $t('This Month') }}</button-tab-item>
      </button-tab>
      <br>
      <divider>{{ $t('Use v-model to set selected item') }}</divider>
      <br>
      <button-tab v-model="demo01">
        <button-tab-item @on-item-click="consoleIndex()">{{ $t('Articles') }}</button-tab-item>
        <button-tab-item @on-item-click="consoleIndex()">{{ $t('Products') }}</button-tab-item>
      </button-tab>
      <br>
      <button-tab v-model="demo01">
        <button-tab-item>{{ $t('Articles sync') }}</button-tab-item>
        <button-tab-item>{{ $t('Products sync') }}</button-tab-item>
      </button-tab>
      <br>
      <divider>{{ $t('Red Dot') }}</divider>
      <br>
      <button-tab>
        <button-tab-item selected>{{ $t('All Messages') }}</button-tab-item>
        <button-tab-item><span class="vux-reddot-s">{{ $t('New Messages') }}</span></button-tab-item>
      </button-tab>
    </div>
  </div>
</template>

<i18n>
Today:
  zh-CN: 今天
This Week:
  zh-CN: 本周
This Month:
  zh-CN: 本月
Articles:
  zh-CN: 文章
Products:
  zh-CN: 商品
Articles sync:
  zh-CN: 文章同步
Products sync:
  zh-CN: 商品同步
All Messages:
  zh-CN: 所有消息
New Messages:
  zh-CN: 新消息
Red Dot:
  zh-CN: 红点
Use v-model to set selected item:
  zh-CN: 使用 v-model 设置当前选中项
</i18n>

<script>
import { ButtonTab, ButtonTabItem, Divider } from 'vux'

export default {
  components: {
    ButtonTab,
    ButtonTabItem,
    Divider
  },
  methods: {
    consoleIndex () {
      console.log('click demo01', this.demo01)
    }
  },
  data () {
    return {
      demo01: 0
    }
  }
}
</script>
