<template>
  <div>
    <popup v-model="show" height="100%">
        <group title="更多">
          <popup-picker title="活动类型："
               :data="pickerList" v-model="pickerValue" :columns="1" show-name>
          </popup-picker>        
        </group>
</popup>
<a @click="show=true">show</a>
  </div>
</template>

<script>
import { Popup, PopupPicker, Group } from 'vux'

export default {
  components: {
    Popup,
    PopupPicker,
    Group
  },
  data () {
    return {
      show: false,
      pickerList: [
        {name: '无', value: '', parent: 0},
        {name: '法会', value: '1', parent: 0},
        {name: '放生', value: '2', parent: 0}
      ],
      pickerValue: ['2']
    }
  }
}
</script>
