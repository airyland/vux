<template>
  <div class="msg">{{ msg }}</div>
</template>

<script>
import SomeService from './service'

export default {
  data () {
    return {
      msg: SomeService.msg
    }
  }
}
</script>
