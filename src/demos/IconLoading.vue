<template>
<div>
  <divider>default usage</divider>
  <span class="vux-loading"></span>
  <group>
    <cell title="Cell Loading"><span class="vux-loading"></span></cell>
    <x-input title="XInput loading" :required="false" :show-clear="false">
      <span class="vux-loading" slot="right"></span>
    </x-input>
  </group>
</div>
</template>

<script>
import { Group, Cell, Divider, XInput } from 'vux'

export default {
  components: {
    Group,
    Cell,
    Divider,
    XInput
  }
}
</script>

<style lang="less" src="vux/src/styles/loading.less"></style>