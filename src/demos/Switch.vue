<template>
  <div>
  	<group title="default">
  	  <boolean title="default setting"></boolean>
  	  <boolean title="default true" :value=true></boolean>
  	</group>
    <group title="disabled">
      <boolean title="default setting" disabled></boolean>
      <boolean title="default true" :value=true disabled></boolean>
    </group>
  </div>
</template>

<script>
import Boolean from '../components/Switch'
import Group from '../components/Group'
export default {
  components: {
    Boolean,
    Group
  }
}
</script>