<template>
  <div>
    <group>
      <cell title="device id" :value="deviceId"></cell>
      <cell title="device model" :value="deviceModel"></cell>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="alert" type="primary">Native Alert</x-button>
      <x-button @click.native="toast" type="primary">Native Toast</x-button>
    </div>
  </div>
</template>

<script>
import { Group, Cell, XButton } from 'vux'

export default {
  components: {
    Group,
    Cell,
    XButton
  },
  methods: {
    alert () {
      this.$api.alert({
        title: 'Hello World',
        msg: 'I\'m native alert',
        buttons: ['Cool']
      })
    },
    toast () {
      this.$api.toast({
        msg: 'Native Toast',
        duration: 6000,
        location: 'bottom'
      })
    }
  },
  mounted () {
    this.$deviceready(() => {
      this.deviceId = api.deviceId
      this.deviceModel = api.deviceModel
      this.$api.setFullScreen({
        fullScreen: true
      })
      this.$api.setStatusBarStyle({
        style: 'dark',
        color: '#fff'
      })
    })
  },
  data () {
    return {
      deviceId: '',
      deviceModel: ''
    }
  }
}
</script>