<template>
  <div>
    <group title="check if value is valid when required===false">
      <x-input type="number" v-model="currentValue"></x-input>
      <h1>{{currentValue}}</h1>
    </group>
    <!--

      目前唯一允许安全选择文本的元素是：
      <input type="text|search|password|tel|url">如下所述：
      https://stackoverflow.com/questions/21177489/selectionstart-selectionend-on-input-type-number-no-longer-allowed-in-chrome

    -->
  </div>
</template>

<script>
  import { XInput, Group, XButton, Cell } from 'vux'
  export default {
    components: {
      XInput,
      XButton,
      Group,
      Cell
    },
    name: 'Issue2960',
    data () {
      return {
        currentValue: 0
      }
    }
  }
</script>

<style scoped>

</style>