<template>
  <x-input v-bind="$attrs" v-model="value" mask="999 9999 9999"></x-input>
</template>

<script>
import XInput from '../'

export default {
  components: {
    XInput
  },
  data () {
    return {
      value: '13888888888'
    }
  }
}
</script>

