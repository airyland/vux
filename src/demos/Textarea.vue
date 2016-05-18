<template>
  <div>
    <group title="textarea">
      <x-textarea :max="200" placeholder="请填写详细信息"></x-textarea>
    </group>
    <group title="和input一起使用">
      <x-input placeholder="标题"></x-input>
      <x-textarea :max="200" placeholder="描述"></x-textarea>
    </group>
    <group title="不显示计数器">
      <x-textarea :max="200" placeholder="请填写详细信息" :show-counter="false"></x-textarea>
    </group>
    <group title="set height=200">
      <x-textarea :max="200" placeholder="请填写详细信息" :show-counter="false" :height="200" :rows="8" :cols="30"></x-textarea>
    </group>
  </div>
</template>

<script>
import { XTextarea, Group, XInput } from '../components/'

export default {
  components: {
    XTextarea,
    Group,
    XInput
  }
}
</script>
