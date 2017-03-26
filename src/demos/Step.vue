<template>
  <div style="width: 95%;margin: 0 auto;">
    <br>
    <div>
      <step v-model="step1" background-color='#fbf9fe'>
        <step-item :title="$t('step 1')" description="step 1"></step-item>
        <step-item :title="$t('step 2')" description="step 2"></step-item>
        <step-item :title="$t('step 3')" description="step 3"></step-item>
      </step>
    </div>
    <x-hr></x-hr>
    <div>
      <step v-model="step2" background-color='#fbf9fe' gutter="20px">
        <step-item :title="$t('done')"></step-item>
        <step-item :title="$t('processing')"></step-item>
        <step-item :title="$t('end')"></step-item>
      </step>
      <div class="btn_wrap">
        <x-button type="primary" @click.native="nextStep">{{ $t('next step') }}</x-button>
      </div>
    </div>
  </div>
</template>

<i18n>
next step:
  zh-CN: 下一步
done:
  zh-CN: 已完成
processing:
  zh-CN: 进行中
end:
  zh-CN: 结束
step 1:
  zh-CN: 步骤1
step 2:
  zh-CN: 步骤2
step 3:
  zh-CN: 步骤3
</i18n>

<script>
import { Step, StepItem, XButton, XHr } from 'vux'

export default {
  components: {
    Step,
    StepItem,
    XButton,
    XHr
  },
  data () {
    return {
      step1: 1,
      step2: 0
    }
  },
  methods: {
    nextStep () {
      this.step2 ++
    }
  }
}
</script>

<style lang="less">
.btn_wrap {
  padding: 0 1rem;
  margin-top: 2rem;
}
</style>
