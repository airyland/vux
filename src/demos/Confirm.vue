<template>
  <div>
    <group>
      <x-switch :title="$t('Toggle')" v-model="show"></x-switch>
    </group>
    <confirm v-model="show" :title="$t('confirm deleting the item')" @on-cancel="onCancel" @on-confirm="onConfirm" @on-show="onShow" @on-hide="onHide">
      <p style="text-align:center;">{{ $t('Are you sure?') }}</p>
    </confirm>
  </div>
</template>

<i18n>
Toggle:
  zh-CN: 显示
Are you sure?:
  zh-CN: 确定咩？
confirm deleting the item:
  zh-CN: 操作提示
</i18n>

<script>
import { Confirm, Group, XSwitch } from 'vux'
export default {
  components: {
    Confirm,
    Group,
    XSwitch
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    onCancel () {
      console.log('on cancel')
    },
    onConfirm () {
      console.log('on confirm')
    },
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    }
  }
}
</script>