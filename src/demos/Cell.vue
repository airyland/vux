<template>
  <div>
    <group>
      <cell title="账户与安全" is-link value="已保护"></cell>
    </group>
    <group>
      <cell title="新消息通知" is-link></cell>
      <cell title="隐私" is-link></cell>
      <cell title="通用" is-link></cell>
    </group>
    <group>
      <cell title="接受新消息通知" value="已开启"></cell>
    </group>
    <group>
      <cell title="custom content">
        <div slot="value"><span style="color: green">I am customed content</span></div>
      </cell>
    </group>
  </div>
</template>

<script>
import { Cell, Group } from '../components/'
export default {
  components: {
    Group,
    Cell
  }
}
</script>