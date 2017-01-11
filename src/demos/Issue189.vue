<template>
  <div>
    <divider>issue 189</divider>
    <group>
      <popup-picker title="test" :data="list3" :columns="3" :value.sync="value3" @on-shadow-change="onShadowChange" placeholder="Please select"></popup-picker>
    </group>
    <picker v-if="fuck" :data="list3" :columns="3" :value.sync="value3"></picker>
    <group>
      <cell title="value" :value="value3 | json"></cell>
    </group>
    <br>
    <div style="margin: 0 10px;">
      <x-button @click="update" type="primary">list 2</x-button>
      <x-button @click="update2" type="primary">list 1</x-button>
    </div>
  </div>
</template>

<script>
import { Cell, Group, Picker, PopupPicker, XButton, Divider } from 'vux'
const list = [{
  name: '中国',
  value: 'china',
  parent: 0
}, {
  name: '美国',
  value: 'USA',
  parent: 0
}, {
  name: '广东',
  value: 'china001',
  parent: 'china'
}, {
  name: '广西',
  value: 'china002',
  parent: 'china'
}, {
  name: '美国001',
  value: 'usa001',
  parent: 'USA'
}, {
  name: '美国002',
  value: 'usa002',
  parent: 'USA'
}, {
  name: '广州',
  value: 'gz',
  parent: 'china001'
}, {
  name: '深圳',
  value: 'sz',
  parent: 'china001'
}, {
  name: '广西001',
  value: 'gx001',
  parent: 'china002'
}, {
  name: '广西002',
  value: 'gx002',
  parent: 'china002'
}, {
  name: '美国001_001',
  value: '0003',
  parent: 'usa001'
}, {
  name: '美国001_002',
  value: '0004',
  parent: 'usa001'
}, {
  name: '美国002_001',
  value: '0005',
  parent: 'usa002'
}, {
  name: '美国002_002',
  value: '0006',
  parent: 'usa002'
}]

export default {
  components: {
    Cell,
    PopupPicker,
    Group,
    XButton,
    Divider,
    Picker
  },
  methods: {
    onShadowChange (val) {
      console.log('on-shadow-change', val)
    },
    update () {
      this.list3 = [{
        name: 'a',
        value: 'a',
        parent: 0
      }, {
        name: 'b',
        value: 'b',
        parent: 0
      }, {
        name: 'c',
        value: 'c',
        parent: 'a'
      }, {
        name: 'd',
        value: 'd',
        parent: 'b'
      }]
    },
    update2 () {
      this.list3 = list
    }
  },
  data () {
    return {
      list3: list,
      value3: []
    }
  }
}
</script>
