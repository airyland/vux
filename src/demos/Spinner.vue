<template>
  <div>
    <group>
      <cell v-for="(type, index) in types" :title="type" :key="type" :inline-desc="index === 3 ? 'size=40px' : ''">
        <spinner :type="type" :size="index === 3 ? '40px' : ''"></spinner>
      </cell>
    </group>
  </div>
</template>

<script>
import { Spinner, Group, Cell } from 'vux'

export default {
  components: {
    Spinner,
    Cell,
    Group
  },
  data () {
    return {
      types: ['android', 'ios', 'ios-small', 'bubbles', 'circles', 'crescent', 'dots', 'lines', 'ripple', 'spiral']
    }
  }
}
</script>
