<template>
  <div>
    <group :title=" $t('Automatic countdown') ">
      <cell title="15s" v-model="value">
        <countdown v-model="time" @on-finish="finish" v-show="show"></countdown>
      </cell>
    </group>
  </div>
</template>

<script>
import { Countdown, Group, Cell } from 'vux'

export default {
  components: {
    Countdown,
    Cell,
    Group
  },
  data () {
    return {
      show: true,
      time: 15,
      value: ''
    }
  },
  methods: {
    finish (index) {
      this.show = false
      this.value = 'completed'
      console.log('current index', index)
    }
  }
}
</script>

<demo>
title:
  en: Automatic countdown
  zh-CN: 自动倒计时
height: 420
order: 1
</demo>