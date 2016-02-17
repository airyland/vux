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
    <tab :line_width=2 color='#fc378c'>
      <tab-item :selected=true>精选</tab-item>
      <tab-item>美食</tab-item>
      <tab-item>电影</tab-item>
      <tab-item>酒店</tab-item>
      <tab-item>外卖</tab-item>
    </tab>
    <br/>  
    <br/>  
    <br/>  
    <tab :line_width=2>
      <tab-item :selected=true>收到的消息</tab-item>
      <tab-item>发出的消息</tab-item>
    </tab>
    <br/>  
    <br/>  
    <br/>  
    <tab :line_width=1>
      <tab-item :selected=true>正在正映</tab-item>
      <tab-item>即将上映</tab-item>
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