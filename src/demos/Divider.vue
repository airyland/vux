<template>
<div>
  <divider>{{ $t('I have bottom line') }}</divider>
</div>
</template>

<i18n>
I have bottom line:
  zh-CN: 我是有底线的
</i18n>

<script>
import { Divider } from 'vux'

export default {
  components: {
    Divider
  }
}
</script>