<template>
  <div>

    <group :title="'no placeholder, the current value is : ' + defaultValue">
      <selector ref="defaultValueRef" title="省份" :options="list" v-model="defaultValue"></selector>
    </group>

    <div style="padding:15px;">
      <x-button type="primary" @click.native="getValue('defaultValueRef')">get full value</x-button>
    </div>

    <group title="with placeholder">
      <selector placeholder="请选择省份" v-model="demo01" title="省份" name="district" :options="list" @on-change="onChange"></selector>
    </group>

    <group title="without title">
      <selector placeholder="请选择省份" v-model="demo02" :options="list"></selector>
    </group>

    <group title="set value=广西">
      <selector v-model="value1" title="省份" :options="plainList" @on-change="onChange"></selector>
    </group>

    <group title="readonly, displays just like a cell">
      <selector value="gd" readonly title="省份" :options="list"></selector>
    </group>

    <group title="use plain options">
      <selector ref="plainValueRef" value="C" title="Selector" :options="list1" @on-change="onChange"></selector>
    </group>

    <div style="padding:15px;">
      <x-button type="primary" @click.native="getValue('plainValueRef')">get full value</x-button>
    </div>

    <group :title="'boolean selector: ' + value3">
      <selector v-model="value3" title="Vux Is Cool" :options="list2"></selector>
    </group>

    <group :title="$t('set valueMap for directly using API data')" label-width="5em">
      <selector ref="valueMapRef" v-model="valueMapValue" :value-map="['idValue', 'idLabel']" title="Selector" :options="valueMapList" @on-change="onChange"></selector>
      <cell-box align-items="flex-start"><pre>{{ valueMapList }}</pre></cell-box>
      <cell title="value" :value="valueMapValue"></cell>
    </group>
    
    <div style="padding:15px;">
      <x-button type="primary" @click.native="getValue('valueMapRef')">get full value</x-button>
    </div>

  </div>
</template>

<script>
import { Selector, Group, Cell, CellBox, XButton } from 'vux'

export default {
  components: {
    Group,
    Selector,
    Cell,
    CellBox,
    XButton
  },
  data () {
    return {
      demo01: null,
      demo02: '',
      defaultValue: 'gd',
      plainList: ['广东', '广西'],
      list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
      list2: [{key: true, value: '是'}, {key: false, value: '否'}],
      value1: '广西',
      value3: true,
      list1: ['A', 'B', 'C'],
      valueMapValue: 'key01',
      valueMapList: [{
        idValue: 'key01',
        idLabel: 'value01',
        otherProp: 'prop01'
      }, {
        idValue: 'key02',
        idLabel: 'value02',
        otherProp: 'prop02'
      }]
    }
  },
  methods: {
    onChange (val) {
      console.log(val)
    },
    getValue (ref) {
      this.$vux.alert.show({
        title: 'getFullValue',
        content: this.$refs[ref].getFullValue()
      })
    }
  }
}
</script>
