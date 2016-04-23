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
  </div>
</template>

<script>
import { ButtonTab, ButtonTabItem } from '../components'

export default {
  components: {
    ButtonTab,
    ButtonTabItem
  }
}
</script>