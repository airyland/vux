<template>
  <div>
    <number description="Default" title="Number"></number>
    <number description="listen to change events" title="Number" :value=0 :min=0 @change="change"></number>
    <number description="set width=100 // not work" title="Number" :width=100></number>
    <number description="set step=0.5" title="Number" :step=0.5></number>
    <number description="set value=1, min=-5 and max=8" title="Number" :min=-5 :max=8 :value=1></number>
    <number :value=10 :readonly=true description="set value and readonly" title="Number"></number>

    <group title='used as group element set type="inline"'>
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