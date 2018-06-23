<template>
  <div>
    {{data}}
    {{metas}}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  preFetch({ store, route }) {
    return store.dispatch('updateComponent')
  },
  computed: mapState(['metas']),
  data () {
    return {
      data: this.$route.params
    }
  }
}
</script>