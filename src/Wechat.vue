<template>
<div>
  <group>
    <cell title="接收新消息通知" value="已启用"></cell>
  </group>
  <tip>如果你要关闭或开启微信的新消息通知，请在iPhone的"设置"-"通知"功能中，找到应用程序"微信"更改。</tip>

  <group>
    <boolean title="通知显示消息详情" :value=true></boolean>
  </group>
  <tip>关闭后，当收到微信消息时，通知提示将不再显示发信人和内容摘要。</tip>

  <group>
    <cell title="功能消息免打扰" :is_link=true></cell>
  </group>
  <tip>设置系统功能消息提示声音和振动的时段。</tip>

  <group>
    <boolean title="声音" :value=false></boolean>
    <boolean title="振动" :value=true></boolean>
  </group>
  <tip>当微信在运行时，你可以设置是否需要声音或者振动。</tip>

  <group>
    <boolean title="朋友圈照片更新" :value=true></boolean>
  </group>
  <tip>关闭后，有朋友更新照片时，界面下面的"发现"切换按钮上不再出现红点提示。</tip>
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