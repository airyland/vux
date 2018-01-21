<template>
  <div>
    <group>
      <cell v-for="type in types" :title="type" :key="type">
        <spinner :type="type" slot="value"></spinner>
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
