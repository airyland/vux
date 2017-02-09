<template>
  <div>
    <group>
      <popup-picker title="选择班级" :inline-desc="selectClass" :data="classList" v-model="selectClass" show-name></popup-picker>
    </group>

    <div style="padding:15px">
      <x-button @click.native="selectClass=['1']" type="primary">设置值为['1']</x-button>
      <x-button @click.native="selectClass=['2']" type="primary">设置值为['2']</x-button>
    </div>

    <group>
      <popup-picker title="选择班级" :inline-desc="selectClass2" :data="classList2" v-model="selectClass2" show-name></popup-picker>
    </group>

    <div style="padding:15px">
      <x-button @click.native="selectClass2=['1', '2']" type="primary">设置值为['1', '2']</x-button>
      <x-button @click.native="selectClass2=['2', '1']" type="primary">设置值为['2', '1']</x-button>
    </div>

  </div>
</template>

<script>
import { Group, PopupPicker, XButton } from 'vux'

export default {
  components: {
    Group,
    PopupPicker,
    XButton
  },
  data () {
    return {
      classList: [],
      selectClass: [],
      classList2: [],
      selectClass2: []
    }
  },
  created () {
    setTimeout(() => {
      this.classList = [[{
        name: '2019届5班',
        value: '1'
      }, {
        name: '2019届4班',
        value: '2'
      }]]
      this.classList2 = [[{
        name: '2019届5班',
        value: '1'
      }, {
        name: '2019届4班',
        value: '2'
      }], [{
        name: '2019届5班',
        value: '1'
      }, {
        name: '2019届4班',
        value: '2'
      }]]
    }, 1000)
    this.selectClass = ['2']
  }
}
</script>