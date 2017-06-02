<template>
  <div>
    <group>
      <popup-radio title="options" :options="options1" v-model="option1"></popup-radio>
    </group>

    <group>
      <popup-radio title="options" :options="options2" v-model="option2"></popup-radio>
    </group>

    <group>
      <popup-radio title="options" :options="options3" v-model="option3">
        <p slot="popup-header" class="vux-1px-b demo3-slot">Please select</p>
      </popup-radio>
    </group>
  </div>
</template>

<script>
import { Group, PopupRadio } from 'vux'

export default {
  components: {
    Group,
    PopupRadio
  },
  data () {
    return {
      option1: 'A',
      options1: ['A', 'B', 'C'],
      option2: '',
      options2: [{
        key: 'A',
        value: 'label A'
      }, {
        key: 'B',
        value: 'label B'
      }],
      option3: 'C',
      options3: ['A', 'B', 'C']
    }
  }
}
</script>

<style scoped>
.demo3-slot {
  text-align: center;
  padding: 8px 0;
  color: #888;
}
</style>
