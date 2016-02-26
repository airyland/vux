<template>
  <div>
    <router-view
    transition
    transition-mode="out-in" keep-alive></router-view>
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
@import 'assets/vendors/weui.0.3.0.min.css';

body {
  font-family: Helvetica, sans-serif;
  background-color: #fbf9fe;
  padding-bottom:50px;
}
.weui_cell_box.weui_cell {
   padding:0;
}

.weui_cell_ft.with_arrow:after {
    content: " ";
    display: inline-block;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    position: relative;
    top: -2px;
    top: -1px;
    margin-left: .3em;
  }

.weui_cells > a {
  color:#000;
}
</style>
