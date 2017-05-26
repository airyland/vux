<template>
  <div>
    <flow>
      <flow-state state="1" title="已付款" is-done></flow-state>
      <flow-line is-done></flow-line>

      <flow-state state="2" title="已发货" is-done></flow-state>
      <flow-line tip="进行中"></flow-line>

      <flow-state state="3" title="待收货"></flow-state>
      <flow-line></flow-line>

      <flow-state state="4" title="完成"></flow-state>
    </flow>


    <flow>
      <flow-state title="已付款" is-done></flow-state>
      <flow-line is-done :line-span="15"></flow-line>

      <flow-state title="已发货" is-done></flow-state>
      <flow-line is-done :line-span="30"></flow-line>

      <flow-state title="待收货" is-done></flow-state>
      <flow-line tip="进行中" tip-direction="bottom" :line-span="45" :process-span="60"></flow-line>

      <flow-state title="完成"></flow-state>
    </flow>

    <flow orientation="vertical" style="height:250px;">
      <flow-state state="1" title="已付款" is-done></flow-state>
      <flow-line is-done></flow-line>

      <flow-state state="2" title="已发货" is-done></flow-state>
      <flow-line tip="进行中"></flow-line>

      <flow-state state="3" title="待收货"></flow-state>
      <flow-line></flow-line>

      <flow-state state="4" title="完成"></flow-state>
    </flow>

    <flow orientation="vertical" style="height:200px;">
      <flow-state state="1" title="已付款" is-done></flow-state>
      <flow-line is-done :line-span="15"></flow-line>

      <flow-state state="2" title="已发货" is-done></flow-state>
      <flow-line :line-span="30"></flow-line>

      <flow-state state="3" title="待收货"></flow-state>
      <flow-line :line-span="45"></flow-line>

      <flow-state state="4" title="完成"></flow-state>
    </flow>

  </div>
</template>

<script>
import { Flow, FlowState, FlowLine } from 'vux'

export default {
  components: {
    Flow,
    FlowState,
    FlowLine
  }
}
</script>