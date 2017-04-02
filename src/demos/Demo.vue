<template>
  <div>
    <keep-alive>
      <demo-list></demo-list>
    </keep-alive>
  </div>
</template>

<script>
import DemoList from './DemoList'

export default {
  components: {
    DemoList
  }
}
</script>
