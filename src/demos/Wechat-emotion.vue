<template>
  <div>
    <emotion>微笑</emotion>
    <emotion is-gif>微笑</emotion>
    <emotion>色</emotion>
    <emotion is-gif>色</emotion>
  </div>
</template>

<script>
import { WechatEmotion as Emotion } from '../components/'
export default {
  components: {
    Emotion
  }
}
</script>
