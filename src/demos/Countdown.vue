<template>
  <div>
    <group title="auto countdown">
      <cell title="15s" :value="value">
        <countdown slot="value" :time="15" @on-finish="finish" v-show="show"></countdown>
      </cell>
    </group>
    <group title="manually">
      <switch title="start" :value.sync="start"></switch>
      <cell title="15s">
        <countdown slot="value" :time="time" :start="start" @on-finish="finish2"></countdown>
      </cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, Countdown, Switch } from '../components'

export default {
  components: {
    Group,
    Cell,
    Countdown,
    Switch
  },
  methods: {
    finish (index) {
      this.show = false
      this.value = 'completed'
      console.log('current index', index)
    },
    finish2 (index) {
      this.start = false
      this.time = 20
    }
  },
  data () {
    return {
      show: true,
      time: 15,
      value: '',
      start: false
    }
  }
}
</script>