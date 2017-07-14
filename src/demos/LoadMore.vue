<template>
  <div>
    <load-more :tip="$t('正在加载')"></load-more>
    <load-more :show-loading="false" :tip="$t('暂无数据')" background-color="#fbf9fe"></load-more>
    <load-more :show-loading="false" background-color="#fbf9fe"></load-more>
  </div>
</template>

<i18n>
正在加载:
  en: Loading
暂无数据:
  en: The End
</i18n>

<script>
import { LoadMore } from 'vux'

export default {
  components: {
    LoadMore
  }
}
</script>