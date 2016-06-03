<template>
  <div>
    <group>
      <switch title="Toggle" :value.sync="show"></switch>
    </group>
    <confirm :show.sync="show" title="confirm deleting the item" @on-cancel="onCancel" @on-confirm="onConfirm">
      <p style="text-align:center;">Are you sure?</p>
    </confirm>
  </div>
</template>

<script>
import { Confirm, Group, Switch } from '../components'

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
  },
  methods: {
    onCancel () {
      console.log('on cancel')
    },
    onConfirm () {
      console.log('on confirm')
    }
  }
}
</script>
