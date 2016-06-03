<template>
  <div>
    <group title="Default">
      <x-number title="Number"></x-number>
    </group>

    <group title="listen to change events">
      <x-number title="Number" :value="0" :min="0" @on-change="change"></x-number>
    </group>

    <group title="set width=100">
      <x-number title="Number" :width="100"></x-number>
    </group>

    <group title="set step=0.5">
      <x-number title="Number" :step="0.5"></x-number>
    </group>

    <group title="set value=1, min=-5 and max=8">
      <x-number title="Number" :min="-5" :max="8" :value="1"></x-number>
    </group>

    <group title="fillable = false">
      <x-number :value="10" title="Number" :fillable="false"></x-number>
    </group>
    
    <group title="with other element">
      <x-number title="Number" :min="-5" :max="8" :value="1" type="inline"></x-number>
      <x-number title="Number" :min="-5" :max="8" :value="1" type="inline"></x-number>
      <switch title="Other element" :value.sync="true"></switch>
    </group>
  </div>
</template>

<script>
import { Group, XNumber, Switch } from '../components'

export default {
  components: {
    XNumber,
    Group,
    Switch
  },
  methods: {
    change (val) {
      console.log('change', val)
    }
  }
}
</script>
