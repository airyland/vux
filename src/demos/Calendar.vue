<template>
  <div>
    <group>
      <calendar v-model="demo1" :title="$t('Basic Usage')" disable-past placeholder="placeholder"></calendar>
    </group>
    <group>
      <calendar v-model="demo2" :title="$t('set value as TODAY')" disable-past></calendar>
    </group>
    <group>
      <calendar @on-change="onChange" v-model="demo3" :title="$t('disable future')" disable-future></calendar>
    </group>
    <group>
      <calendar @on-change="onChange" v-model="demo4" :title="$t('show popup header')" show-popup-header :popup-header-title="$t('please select')" disable-future></calendar>
    </group>
  </div>
</template>

<i18n>
Basic Usage:
  zh-CN: 一般使用
set value as TODAY:
  zh-CN: 设置时间为今天
disable future:
  zh-CN: 禁止选择未来时间
show popup header:
  zh-CN: 显示 popup 头部
please select:
  zh-CN: 请选择日期
</i18n>

<script>
import { Group, Calendar, Cell } from 'vux'

export default {
  components: {
    Calendar,
    Group,
    Cell
  },
  data () {
    return {
      demo1: '',
      demo2: 'TODAY',
      demo3: 'TODAY',
      demo4: 'TODAY'
    }
  },
  methods: {
    onChange (val) {
      console.log('on change', val)
    }
  }
}
</script>
