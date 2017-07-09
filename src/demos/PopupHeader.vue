<template>
  <div>
    <popup-header :left-text="$t('cancel')" :right-text="$t('done')" :title="$t('Please select your card')"></popup-header>
    <group>
      <x-switch v-model="show1" :title="$t('used with Popup')"></x-switch>
    </group>
    <div v-transfer-dom>
      <popup v-model="show1">
        <!-- group already has a top border, so we need to hide header's bottom border-->
        <popup-header
        :left-text="$t('cancel')"
        :right-text="$t('done')"
        :title="$t('Please select your card')"
        :show-bottom-border="false"
        @on-click-left="show1 = false"
        @on-click-right="show1 = false"></popup-header>
        <group gutter="0">
          <radio :options="[$t('Card 1'), $t('Card 2'), $t('Card 3'), $t('Card 4')]"></radio>
        </group>
      </popup>
    </div>
  </div>
</template>

<i18n>
cancel:
  zh-CN: 取消
done:
  zh-CN: 确定
Please select your card:
  zh-CN: 请选择银行卡
used with Popup:
  zh-CN: Popup 中使用
Card 1:
  zh-CN: 招商银行
Card 2:
  zh-CN: 工商银行
Card 3:
  zh-CN: 农业银行
Card 4:
  zh-CN: 增加银行卡
</i18n>

<script>
import { PopupHeader, Popup, TransferDom, Group, XSwitch, Radio } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    PopupHeader,
    Popup,
    Group,
    XSwitch,
    Radio
  },
  data () {
    return {
      show1: false
    }
  }
}
</script>
