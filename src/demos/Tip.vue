<template>
  <number description="Default" title="Number"></number>
  <tip>I am a tip.</tip>

  <number description="Default" title="Number"></number>
  <tip align="center">I am a tip align center.</tip>
</template>

<script>
import { Tip, Number } from '../components/'
export default {
  components: {
    Tip,
    Number
  }
}
</script>
