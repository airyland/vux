<template>
  <div>
    <group>
      <switch title="Toggle" :value.sync="show"></switch>
    </group>
    <confirm :show.sync="show" title="confirm deleting the item"><p style="text-align:center;">Are you sure?</p></confirm>
  </div>
</template>

<script>
import { Confirm, Group, Switch } from '../components/'

export default {
  components: {
    Confirm,
    Group,
    Switch
  },
  data () {
    return {
      show: false
    }
  }
}
</script>
