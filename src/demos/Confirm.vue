<template>
  <div>
    <group>
      <x-switch :title="$t('Toggle')" v-model="show"></x-switch>
    </group>
    <group>
      <x-switch :title="$t('Toggle show-input')" v-model="show3"></x-switch>
    </group>
    <group>
      <x-switch :title="$t('Set default input value')" v-model="show5"></x-switch>
    </group>
    <group>
      <x-switch :title="$t('Toggle_android')" v-model="show2"></x-switch>
    </group>
    <group>
      <x-switch :title="$t('closeOnConfirm=false')" v-model="show4"></x-switch>
    </group>
    <div v-transfer-dom>
      <confirm v-model="show"
      :title="$t('Confirm deleting the item')"
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
      :title="$t('Confirm deleting the item')"
      :input-attrs="{type: 'number'}"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide">
      </confirm>
    </div>
    <br>
    <div v-transfer-dom>
      <confirm v-model="show5"
      show-input
      ref="confirm5"
      :title="$t('Confirm deleting the item')"
      @on-cancel="onCancel"
      @on-confirm="onConfirm5"
      @on-show="onShow5"
      @on-hide="onHide">
      </confirm>
    </div>
    <br>
    <div v-transfer-dom>
      <confirm v-model="show2"
      :title="$t('Confirm deleting the item')"
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
      :title="$t('Confirm deleting the item')"
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
      <x-button @click.native="showPlugin3" type="primary"> {{ $t('Call prompt by using plugin') }} </x-button>
    </div>
  </div>
</template>

<i18n>
Toggle:
  zh-CN: 显示
Toggle show-input:
  zh-CN: 显示Prompt
Toggle_android:
  zh-CN: 安卓风格
Are you sure?:
  zh-CN: 确定咩？
Confirm deleting the item:
  zh-CN: 操作提示
Please input something:
  zh-CN: 请输入些什么
Plugin usage:
  zh-CN: 插件形式调用
Show:
  zh-CN: 显示
closeOnConfirm=false:
  zh-CN: 阻止自动关闭
Set default input value:
  zh-CN: 设置默认输入文字
Call prompt by using plugin:
  zh-CN: 插件形式调用prompt
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
      show4: false,
      show5: false
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
    onShow5 () {
      this.$refs.confirm5.setInputValue('default')
    },
    onConfirm5 (value) {
      this.$refs.confirm5.setInputValue('')
      this.$vux.toast.text('input value: ' + value)
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
      const _this = this
      this.$vux.confirm.prompt('123', {
        title: 'Title',
        onShow () {
          console.log('promt show')
          _this.$vux.confirm.setInputValue('set input value')
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
