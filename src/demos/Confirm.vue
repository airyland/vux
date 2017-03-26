<template>
  <div>
    <group>
      <x-switch :title="$t('Toggle')" v-model="show"></x-switch>
    </group>
    <div v-transfer-dom>
      <confirm v-model="show" :title="$t('confirm deleting the item')"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide">
        <p style="text-align:center;">{{ $t('Are you sure?') }}</p>
      </confirm>
    </div>
    <br>
    <div style="padding:15px;">
      <x-button @click.native="showPlugin" type="primary">Show</x-button>
    </div>
    <div style="padding:15px;">
      <x-button @click.native="showPlugin2" type="primary">Hide after 3s</x-button>
    </div>
    <div style="padding:15px;">
      <x-button @click.native="showPlugin3" type="primary">Hide On Blur</x-button>
    </div>
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
import { Confirm, Group, XSwitch, XButton, TransferDomDirective as TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Confirm,
    Group,
    XSwitch,
    XButton
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
    },
    showPlugin () {
      this.$vux.confirm.show({
        title: 'Title',
        content: 'Content',
        onShow () {
          console.log('plugin show')
        },
        onHide () {
          console.log('plugin hide')
        },
        onCancel () {
          console.log('plugin cancel')
        },
        onConfirm () {
          console.log('plugin confirm')
        }
      })
    },
    showPlugin2 () {
      this.showPlugin()
      setTimeout(() => {
        this.$vux.confirm.hide()
      }, 3000)
    },
    showPlugin3 () {
      this.$vux.confirm.show({
        title: 'Title',
        content: 'Content',
        hideOnBlur: true,
        onConfirm () {
          console.log('plugin confirm 3')
        }
      })
    }
  }
}
</script>
