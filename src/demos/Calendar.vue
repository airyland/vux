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

    <group>
      <calendar placeholder="placeholder" @on-change="onChange" v-model="demo5" :title="$t('multiple dates')" :popup-header-title="$t('please select')" disable-future></calendar>
    </group>

     <group>
      <calendar :display-format="displayFormat" :placeholder="$t('please select')" @on-change="onChange" v-model="demo6" :title="$t('format multiple dates')" :popup-header-title="$t('please select')" disable-future></calendar>
      <cell-box align-items="flex-start">
        <span class="selected-days">value:</span>
        <div>
          <badge v-for="day in demo6" :text="day" :key="day" style="margin-right:10px;"></badge>
        </div>
      </cell-box>
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
multiple dates:
  zh-CN: 多选
format multiple dates:
  zh-CN: 格式化多选日期值显示
</i18n>

<script>
import { Group, Calendar, Cell, Badge, CellBox } from 'vux'

export default {
  components: {
    Calendar,
    Group,
    Cell,
    Badge,
    CellBox
  },
  data () {
    return {
      demo1: '',
      demo2: 'TODAY',
      demo3: 'TODAY',
      demo4: 'TODAY',
      demo5: [],
      demo6: [],
      displayFormat (value, type) {
        if (type === 'string') {
          return value
        } else {
          return value.length ? (value.length + ' days') : ''
        }
      }
    }
  },
  methods: {
    onChange (val) {
      console.log('on change', val)
    }
  }
}
</script>

<style scoped>
.selected-days {
  color: #999;
  width: 90px;
}
</style>
