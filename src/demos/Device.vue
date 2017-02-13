<template>
  <div>
    <group>
      <cell v-for="(item, key) in $device" :title="key">{{item}}</cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
  }
}
</script>