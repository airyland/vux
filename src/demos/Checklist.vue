<template>
  <div>
    <checklist title="default checklist" :options="commonList" :value.sync="checklist001" @change="change"></checklist>

    <checklist title="preselect China and Japan" :options="commonList" :value.sync="checklist002" @change="change"></checklist>

    <checklist title="set max=2" :options="commonList" :value.sync="checklist003" :max=2 @change="change"></checklist>

    <checklist title="set required=false and no min-error will show" :options="commonList" :value.sync="checklist004" :max=2 :required=false @change="change"></checklist>

    <checklist title="set random order" random-order :options="checklist005" :value.sync="checklist005Value" @change="change"></checklist>
  </div>
</template>

<script>
  import { Group, Checklist } from '../components/'
  export default {
    components: {
      Group,
      Checklist
    },
    methods: {
      change: function (val) {
        console.log('change', val)
      }
    },
    data: function () {
      return {
        commonList: [ 'China', 'Japan', 'America' ],
        checklist001: [],
        checklist002: [ 'China', 'Japan' ],
        checklist003: [ 'China', 'Japan' ],
        checklist004: [],
        checklist005: [ '01', '02', '03' ],
        checklist005Value: []
      }
    }
  }
</script>