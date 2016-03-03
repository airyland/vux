<template>
<div>
<group title="Basic">
  <switch title="Camera" :value=true></switch>
  <cell title="Camera Name" value="小蚁智能摄像机"></cell>
  <cell title="Settings" inline-desc="Status light, image rotation, newwork info, firmware etc." link="test"></cell>
</group>

<group title="Security">
  <switch title="PIN Protection" inline-desc="Require PIN to access camera" :value=false></switch>
</group>

<group title="Alerts">
  <switch title="Activity Alerts" inline-desc="Send alerts when activity is detected" :value=true></switch>
  <cell title="Settings" inline-desc="Video alerts, frequency, more" link="test"></cell>
  <cell title="Schedule" value="11:00-22:00"></cell>
</group>

<group title="Storage">
  <switch title="Activity Detection Recording" inline-desc="Videos will only be saved when activity is detected" :value=false></switch>
  <cell title="Storage" value="In good condition"></cell>
</group>

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

export default {
  ready: function () {
  },
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
    Xinput
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
</style>