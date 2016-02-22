<template>
  <div>
    <group title="textarea">
      <textarea :max=200 placeholder="请填写详细信息"></textarea>
    </group>
    <group title="和input一起使用">
      <x-input placeholder="标题"></x-input>
      <textarea :max=200 placeholder="描述"></textarea>
    </group>
    <group title="不显示计数器">
      <textarea :max=200 placeholder="请填写详细信息" :show-counter=false></textarea>
    </group>
  </div>
</template>

<script>
  import { Textarea, Group, Input as XInput } from '../components/'
  export default {
    components: {
      Textarea,
      Group,
      XInput
    }
  }
</script>