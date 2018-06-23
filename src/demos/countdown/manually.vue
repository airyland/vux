<template>
  <div>
    <group :title=" $t('Manually') ">
      <x-switch :title=" $t('Start') " v-model="start"></x-switch>
      <cell title="15s">
        <countdown v-model="time" :start="start" @on-finish="finish"></countdown>
      </cell>
    </group>
  </div>
</template>

<script>
import { Countdown, Group, Cell, XSwitch } from 'vux'

export default {
  components: {
    Countdown,
    Cell,
    Group,
    XSwitch
  },
  data () {
    return {
      time: 15,
      value: '',
      start: false
    }
  },
  methods: {
    finish (index) {
      this.start = false
      this.time = 20
    }
  }
}
</script>

<demo>
title:
  en: Manually
  zh-CN: 手动模式
height: 420
order: 1
</demo>