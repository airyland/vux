<template>
  <div>
    <group>
      <cell v-for="type in types" :title="type">
        <spinner :type="type" slot="value"></spinner>
      </cell>
    </group>
  </div>
</template>

<script>
import Spinner from '../components/spinner/'
import Group from '../components/Group'
import Cell from '../components/Cell'
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