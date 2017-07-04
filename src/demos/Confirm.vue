<template>
  <div>
    <group>
      <x-switch :title="$t('Toggle')" v-model="show"></x-switch>
    </group>
    <group>
      <x-switch :title="$t('Toggle_show_input')" v-model="show3"></x-switch>
    </group>
    <group>
      <x-switch :title="$t('Toggle_android')" v-model="show2"></x-switch>
    </group>
    <group>
      <x-switch :title="$t('closeOnConfirm=false')" v-model="show4"></x-switch>
    </group>
    <div v-transfer-dom>
      <confirm v-model="show"
      :title="$t('confirm deleting the item')"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide">
        <p style="text-align:center;">{{ $t('Are you sure?') }}</p>
      </confirm>
    </div>
    <br>
    <div v-transfer-dom>
      <confirm v-model="show3"
      show-input
      :title="$t('confirm deleting the item')"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide">
      </confirm>
    </div>
    <br>
    <div v-transfer-dom>
      <confirm v-model="show2"
      :title="$t('confirm deleting the item')"
      theme="android"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide">
        <p style="text-align:center;">{{ $t('I miss u sunyi') }}</p>
      </confirm>
    </div>
    <br>
    <div v-transfer-dom>
      <confirm
      v-model="show4"
      :close-on-confirm="false"
      :title="$t('confirm deleting the item')"
      @on-confirm="onConfirm4">
        <p style="text-align:center;">{{ $t('Are you sure?') }}</p>
      </confirm>
    </div>
    <br>
    <div style="padding:15px;">
      <x-button @click.native="showPlugin" type="primary">{{ $t('Show') }}</x-button>
    </div>
    <div style="padding:15px;">
      <x-button @click.native="showPlugin2" type="primary">{{ $t('Plugin usage') }}</x-button>
    </div>
    <div style="padding:15px;">
      <x-button @click.native="showPlugin3" type="primary">插件形式调用promt</x-button>
    </div>
  </div>
</template>

<i18n>
Toggle:
  zh-CN: 显示
Toggle_show_input:
  zh-CN: 显示Promt
Toggle_android:
  zh-CN: 安卓风格
Are you sure?:
  zh-CN: 确定咩？
confirm deleting the item:
  zh-CN: 操作提示
please input something:
  zh-CN: 请输入些什么
Plugin usage:
  zh-CN: 插件形式调用
Show:
  zh-CN: 显示
closeOnConfirm=false:
  zh-CN: 阻止自动关闭
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
      show: false,
      show2: false,
      show3: false,
      show4: false
    }
  },
  methods: {
    onCancel () {
      console.log('on cancel')
    },
    onConfirm (msg) {
      console.log('on confirm')
      if (msg) {
        alert(msg)
      }
    },
    onConfirm4 () {
      console.log('on confirm')
      this.$vux.loading.show({
        transition: '',
        text: 'processing'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
        this.show4 = false
      }, 1000)
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
    },
    showPlugin3 () {
      this.$vux.confirm.prompt('123', {
        title: 'Title',
        onShow () {
          console.log('promt show')
        },
        onHide () {
          console.log('prompt hide')
        },
        onCancel () {
          console.log('prompt cancel')
        },
        onConfirm (msg) {
          alert(msg)
        }
      })
    }
  }
}
</script>
