<template>
  <div id="app">
  <br>
<br>

<group title="boolean elements">
  <boolean title="default setting"></boolean>
  <boolean title="default true" :value=true></boolean>
</group>

<br>
<br>

    <number description="Default" title="Number"></number>
    <number description="listen to change events" title="Number" :value=0 :min=0 @change="change"></number>
    <number description="set width=100 // not work" title="Number" :width=100></number>
    <number description="set step=0.5" title="Number" :step=0.5></number>
    <number description="set value=1, min=-5 and max=8" title="Number" :min=-5 :max=8 :value=1></number>
    <number :value=10 :readonly=true description="set value and readonly" title="Number"></number>

    <group title='used as group element set type="inline"'>
      <number title="Number" :min=-5 :max=8 :value=1 type="inline"></number>
      <number title="Number" :min=-5 :max=8 :value=1 type="inline"></number>
      <div class="weui_cell weui_cell_switch">
            <div class="weui_cell_hd weui_cell_primary">Other element</div>
            <div class="weui_cell_ft">
                <input class="weui_switch" type="checkbox"/>
            </div> 
        </div>
    </group>
 

    <br/>
    <br/>

  
    <selector description="no placeholder" title="省份" :options="list"></selector>
    
    <selector description="with placeholder" placeholder="请选择省份" title="省份" :options="list" @change="change"></selector>

    <selector description="without title" placeholder="请选择省份" :options="list"></selector>

    <selector description="set value=广西" :selected.sync="selected1" :value.sync="value1" title="省份" :options="list"></selector>

    <selector description="readonly" selected="广东" :readonly=true title="省份" :options="list"></selector>


    <group title='used as a group element set type="inline"'>
     <selector placeholder="请选择省份" title="省份" :options="list" type="inline"></selector>
     <selector description="set 广西=selected" selected="广西" title="省份" :options="list" type="inline"></selector>
    </group>

  <br/>
  <br/>
  
  <group-title>types: default, primary, warn</group-title>
  <btn>submit</btn>
  <btn type="primary">primary</btn>
  <btn type="warn">Delete</btn>

  <group-title>disabled</group-title>
  <btn :disabled=true>disable submit</btn>
  <btn type="primary" :disabled=true>disable primary</btn>
  <btn type="warn" :disabled=true>disable Delete</btn>

  <group-title>use :text and :disabled</group-title>
  <btn :text="submit001" :disabled="disable001" @click="processButton001" type="primary"></btn>

<br>
<br>

 <number description="Default" title="Number"></number>
 <tip>I am a tip.</tip>

  <number description="Default" title="Number"></number>
  <tip align="center">I am a tip align center.</tip>
  
</template>

<script>
import Hello from './components/Hello'
import Number from './components/Number'
import Selector from './components/Select'
import Group from './components/Group'
import Btn from './components/Button'
import Tip from './components/tip'
import Boolean from './components/Boolean'
import GroupTitle from './components/Group-title'

export default {
  components: {
    Hello,
    Number,
    Selector,
    Group,
    Btn,
    Tip,
    Boolean,
    GroupTitle
  },
  data: function () {
    return {
      list: [{ text: '广东', value: 'gd'}, {text: '广西', value: 'gx'}],
      selected1: '广西',
      value1:'',
      submit001:'click me',
      disable001: false
    }
  },
  methods: {
    change: function (value) {
      console.log('change:', value,'parent value:',this.selected1)
      console.log('parent value1',this.value1)
      this.selected1 = value;
    },
    processButton001: function(){
      this.submit001='processing';
      this.disable001=true;
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
  background-color: #fbf9fe;
}
.weui_cell_box.weui_cell {
   padding:0;
}
</style>
