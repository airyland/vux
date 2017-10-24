<template>
  <div>
    <group>
      <cell :title="$t('Total')" :value="$t('$1024')"></cell>
      <cell-form-preview :list="list"></cell-form-preview>
    </group>
  </div>
</template>

<i18n>
Total:
  zh-CN: 合计
'$1024':
  zh-CN: ￥1024
Apple:
  zh-CN: 苹果
Banana:
  zh-CN: 香蕉
Fish:
  zh-CN: 鱼肉
</i18n>

<script>
import { CellFormPreview, Group, Cell } from 'vux'

export default {
  components: {
    CellFormPreview,
    Group,
    Cell
  },
  data () {
    return {
      list: [{
        label: 'Apple',
        value: '3.29'
      }, {
        label: 'Banana',
        value: '1.04'
      }, {
        label: 'Fish',
        value: '8.00'
      }]
    }
  }
}
</script>
