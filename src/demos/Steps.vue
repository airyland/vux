<template>
  <div>
    <div>
      <v-steps :current="step1">
        <v-step title="步骤1" icon="cloud"></v-step>
        <v-step title="步骤2"></v-step>
        <v-step title="步骤3"></v-step>
      </v-steps>
    </div>
    <divider>切换到下一步</divider>
    <div>
      <v-steps :current.sync="step2">
        <v-step title="已完成"></v-step>
        <v-step title="进行中"></v-step>
        <v-step title="待完成"></v-step>
      </v-steps>
      <div class="btn_wrap">
        <x-button type="primary" @click="nextStep">下一步</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { VSteps, VStep, XButton, Divider } from '../components'

export default {
  components: {
    VSteps,
    VStep,
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