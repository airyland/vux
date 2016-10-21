<template>
  <div>
    <group>
      <switch title="Toggle" :value.sync="show"></switch>
    </group>
    <alert :show.sync="show" title="congratulations" @on-show="onShow" @on-hide="onHide">Message is sent successfully~</alert>
    <group title="As a plugin(>=v0.1.3)">
      <switch title="Show" :value.sync="show1" @on-change="onChange"></switch>
    </group>
  </div>
</template>

<script>
import { Alert, Group, Switch } from '../components'

export default {
  components: {
    Alert,
    Group,
    Switch
  },
  data () {
    return {
      show: false,
      show1: false
    }
  },
  methods: {
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
    onChange (val) {
      const _this = this
      if (val) {
        this.$vux.alert.show({
          title: 'Vux',
          content: 'Be Careful',
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            console.log('Plugin: I\'m hiding')
            _this.show1 = false
          }
        })
      } else {
        this.$vux.alert.hide()
      }
    }
  }
}
</script>
