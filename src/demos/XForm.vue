<template>
  <div>
    <x-form ref="form">
      <x-input title="必填" name="aaa" v-model="value1" required></x-input>
      <x-input title="最小长度5" name="bbb" v-model="value2" required :min="5"></x-input>
    </x-form>
    <x-button @click.native="validate">验证</x-button>
    <group v-for="e in errors">
      <cell v-for="(v,k) in e" :title="k" :value="v"></cell>
    </group>
  </div>
</template>
<script>
  import { XForm, XInput, XButton, Group, Cell } from 'vux'

  export default {
    components: {
      XForm, XInput, XButton, Group, Cell
    },
    data () {
      return {
        value1: '',
        value2: '',
        errors: {}
      }
    },
    methods: {
      validate () {
        this.$refs.form.validate()
        this.errors = this.$refs.form.errors
      }
    }
  }
</script>
