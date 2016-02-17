<template>
  <div>
    <textarea title="textarea" :max=200 placeholder="请填写详细信息"></textarea>
  </div>
</template>

<script>
  import { Textarea } from '../components/'
  export default {
    components: {
      Textarea
    }
  }
</script>