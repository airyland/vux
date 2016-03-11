<template>
  <div>
    <group title="Default">
      <number title="Number"></number>
    </group>
      
    <group title="listen to change events">
      <number title="Number" :value=0 :min=0 @change="change"></number>
    </group>
    <group title="set width=100">
      <number title="Number" :width=100></number>
    </group>
    <group title="set step=0.5">
      <number title="Number" :step=0.5></number>
    </group>

    <group title="set value=1, min=-5 and max=8">
      <number title="Number" :min=-5 :max=8 :value=1></number>
    </group>
    <group title="fillable = false">
      <number :value=10 title="Number" :fillable=false></number>
    </group>
    <group title='with other element'>
      <number title="Number" :min=-5 :max=8 :value=1 type="inline"></number>
      <number title="Number" :min=-5 :max=8 :value=1 type="inline"></number>
      <switch title="Other element" :value=true></switch>
    </group>
  </div>
</template>

<script>
  import { Group, Number, Switch } from '../components/'
  export default {
    components: {
      Number,
      Group,
      Switch
    },
    methods: {
      change: function (val) {
        console.log('change', val)
      }
    }
  }
</script>