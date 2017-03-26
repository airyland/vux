<template>
  <div>
    <br/>
    <br/>
    <br/>
    <div style="height:44px;">
      <sticky scroll-box="vux_view_box_body" :offset="46" :check-sticky-support="false">
        <tab :line-width="1">
          <tab-item selected>正在正映</tab-item>
          <tab-item>即将上映</tab-item>
        </tab>
      </sticky>
    </div>
    <p v-for="i in 100">{{i}}<br></p>
  </div>
</template>

<script>
import { Tab, TabItem, Sticky } from 'vux'

export default {
  components: {
    Tab,
    TabItem,
    Sticky
  }
}
</script>
