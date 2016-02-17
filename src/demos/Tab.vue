<template>
  <div>
    <tab>
      <tab-item>已发货</tab-item>
      <tab-item :selected=true>未发货</tab-item>
      <tab-item>全部订单</tab-item>
    </tab>
    <br/>  
    <br/>  
    <br/>  
    <tab>
      <tab-item :selected=true>收到的消息</tab-item>
      <tab-item>发出的消息</tab-item>
    </tab>
  </div>
</template>

<script>
  import { Tab, TabItem } from '../components/'
  export default {
    components: {
      Tab,
      TabItem
    }
  }
</script>