<template>
  <div style="text-align:center;">
    <popover placement="top" style="margin: 20px;" @on-show="onShow" @on-hide="onHide">
      <div slot="content" class="popover-demo-content">
        hello world
      </div>
      <button class="btn btn-default">{{ $t('Popover on top') }}</button>
    </popover>

    <popover placement="bottom" style="margin: 20px;">
      <div slot="content" class="popover-demo-content">
        hello world
      </div>
      <button class="btn btn-default">{{ $t('Popover on bottom') }}</button>
    </popover>

    <popover placement="left" style="margin: 20px;">
      <div slot="content" class="popover-demo-content">
        hello world
      </div>
      <button class="btn btn-default">{{ $t('Popover on left') }}</button>
    </popover>

    <popover placement="right" style="margin: 20px;">
      <div slot="content" class="popover-demo-content">
        hello world
      </div>
      <button class="btn btn-default">{{ $t('Popover on right') }}</button>
    </popover>
  </div>
</template>

<i18n>
Popover on top:
  zh-CN: 上方出现
Popover on bottom:
  zh-CN: 下方出现
Popover on left:
  zh-CN: 左边出现
Popover on right:
  zh-CN: 右边出现
</i18n>

<script>
import { Popover } from 'vux'

export default {
  components: {
    Popover
  },
  methods: {
    onShow () {
      console.log('on show')
    },
    onHide () {
      console.log('on hide')
    }
  }
}
</script>

<style scoped>
.popover-demo-content {
  padding: 5px 10px;
}
</style>
