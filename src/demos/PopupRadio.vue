<template>
  <div>
    <group>
      <popup-radio title="options" :options="options1"></popup-radio>
    </group>
  </div>
</template>

<script>
import { Group, PopupRadio } from 'vux'

export default {
  components: {
    Group,
    PopupRadio
  },
  data () {
    return {
      options1: ['A', 'B', 'C']
    }
  }
}
</script>
