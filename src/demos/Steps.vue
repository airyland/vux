<template>
  <div>
    <div>
      <step :current="step1">
        <step-item title="步骤1" icon="cloud"></step-item>
        <step-item title="步骤2"></step-item>
        <step-item title="步骤3"></step-item>
      </step>
    </div>
    <divider>切换到下一步</divider>
    <div>
      <step :current.sync="step2">
        <step-item title="已完成"></step-item>
        <step-item title="进行中"></step-item>
        <step-item title="待完成"></step-item>
      </step>
      <div class="btn_wrap">
        <x-button type="primary" @click="nextStep">下一步</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Step, StepItem, XButton, Divider } from '../components'

export default {
  components: {
    Step,
    StepItem,
    XButton,
    Divider
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

<style>
.btn_wrap {
  padding: 0 1rem;
  margin-top: 2rem;
}
</style>