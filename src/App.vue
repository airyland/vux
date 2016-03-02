<template>
  <div>
    <router-view
    transition
    transition-mode="out-in"></router-view>
  </div>
</template>

<script>
import DevTip from './components/Dev-tip'
import Number from './components/Number'
import Selector from './components/Select'
import Group from './components/Group'
import Btn from './components/Button'
import Tip from './components/Tip'
import Switch from './components/Switch'
import GroupTitle from './components/Group-title'
import Radio from './components/Radio'
import Checklist from './components/Checklist'
import Textarea from './components/Textarea'
import Cell from './components/Cell'
import Xinput from './components/Input'
import Style from './components/Style.vue'

export default {
  components: {
    Number,
    Selector,
    Group,
    Btn,
    Tip,
    Switch,
    GroupTitle,
    Radio,
    DevTip,
    Checklist,
    Textarea,
    Cell,
    Xinput,
    Style
  },
  data: function () {
    return {
      list: [{ text: '广东', value: 'gd'}, {text: '广西', value: 'gx'}],
      selected1: '广西',
      value1: '',
      submit001: 'click me',
      disable001: false,
      radio001: [ 'China', 'Japan' ],
      radio001Value: 'China',
      radio002Value: 'Japan',
      commonList: [ 'China', 'Japan', 'America' ],
      checklist001: [],
      checklist002: [ 'China', 'Japan' ],
      checklist003: [ 'China', 'Japan' ],
      checklist004: [],
      checklist005: [ '01', '02', '03' ],
      checklist005Value: []
    }
  },
  methods: {
    change: function (value) {
      console.log('change:', value)
    },
    processButton001: function () {
      this.submit001 = 'processing'
      this.disable001 = true
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
  background-color: #fbf9fe;
  padding-bottom:50px;
}
</style>
