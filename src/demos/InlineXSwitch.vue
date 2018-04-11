<template>
  <div>
    <div style="text-align:center;margin-top:15px;">
      <inline-x-switch v-model="value"></inline-x-switch>
    </div>
    <group>
      <x-switch title="switch" v-model="value"></x-switch>
    </group>
  </div>
</template>

<script>
import { InlineXSwitch, XSwitch, Group } from 'vux'

export default {
  components: {
    InlineXSwitch,
    XSwitch,
    Group
  },
  data () {
    return {
      value: false
    }
  }
}
</script>