<template>
<div>
<group title="Basic">
  <boolean title="Camera" :value=true></boolean>
  <cell title="Camera Name" :is_link=true value="小蚁智能摄像机"></cell>
  <cell title="Settings" inline_desc="Status light, image rotation, newwork info, firmware etc." :is_link=true></cell>
</group>

<group title="Security">
  <boolean title="PIN Protection" inline_desc="Require PIN to access camera" :value=false></boolean>
</group>

<group title="Alerts">
  <boolean title="Activity Alerts" inline_desc="Send alerts when activity is detected" :value=true></boolean>
  <cell title="Settings" inline_desc="Video alerts, frequency, more" :is_link=true></cell>
  <cell title="Schedule" :is_link=true value="11:00-22:00"></cell>
</group>

<group title="Storage">
  <boolean title="Activity Detection Recording" inline_desc="Videos will only be saved when activity is detected" :value=false></boolean>
  <cell title="Storage" :is_link=true value="In good condition"></cell>
</group>

  </div>
</template>

<script>
import DevTip from './components/Dev-tip'
import Number from './components/Number'
import Selector from './components/Select'
import Group from './components/Group'
import Btn from './components/Button'
import Tip from './components/tip'
import Boolean from './components/Boolean'
import GroupTitle from './components/Group-title'
import Radio from './components/Radio'
import Checklist from './components/Checklist'
import Textarea from './components/Textarea'
import Cell from './components/Cell'
import Xinput from './components/Input'

export default {
  ready: function(){
    console.log('ready');
  },
  components: {
    Number,
    Selector,
    Group,
    Btn,
    Tip,
    Boolean,
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
      value1:'',
      submit001:'click me',
      disable001: false,
      radio001:['China', 'Japan'],
      radio001Value: 'China',
      radio002Value: 'Japan',
      commonList:['China', 'Japan','America'],
      checklist001: [],
      checklist002: ['China','Japan'],
      checklist003: ['China','Japan'],
      checklist004: [],
      checklist005: ['01','02','03'],
      checklist005Value:[]
    }
  },
  methods: {
    change: function (value) {
      console.log('change:', value)
    },
    processButton001: function(){
      this.submit001='processing';
      this.disable001=true;
    }
  }
}
</script>

<style>
</style>