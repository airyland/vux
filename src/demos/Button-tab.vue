<template>
  <div>
    <button-tab>
      <button-tab-item>Today</button-tab-item>
      <button-tab-item selected>This Week</button-tab-item>
      <button-tab-item>This Month</button-tab-item>
    </button-tab>
    <br>
    <button-tab>
      <button-tab-item selected>文章订阅</button-tab-item>
      <button-tab-item>商品订阅</button-tab-item>
    </button-tab>
    <br>
    <divider>Red Dot</divider>
    <button-tab>
      <button-tab-item selected>All Message</button-tab-item>
      <button-tab-item><span class="vux-reddot-s">New Message</span></button-tab-item>
    </button-tab>
  </div>
</template>

<script>
import { ButtonTab, ButtonTabItem, Divider } from '../components'

export default {
  components: {
    ButtonTab,
    ButtonTabItem,
    Divider
  }
}
</script>