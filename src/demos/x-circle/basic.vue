<template>
  <div class="vux-circle-demo">
    <br>
    <div style="width:150px;height:150px;">
      <x-circle :percent="percent" :stroke-width="5" stroke-color="#04BE02">
        <span>{{ percent }}%</span>
      </x-circle>
    </div>
    <br>
    <div style="width:250px;">
      <range v-model="percent" :min="0" :max="100"></range>
    </div>
  </div>
</template>

<script>
import { XCircle, Range, Icon } from 'vux'

export default {
  components: {
    XCircle,
    Range,
    Icon
  },
  data () {
    return {
      percent: 10
    }
  }
}
</script>

<style scoped>
.vux-circle-demo {
  text-align: center;
}
.vux-circle-demo > div {
  margin: 0 auto;
}
</style>

<demo>
title:
  en: basic usage
  zh-CN: 基础用法
height: 250
order: 1
</demo>
