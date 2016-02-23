<template>
  <div>
  	<group title="switch element">
  	  <boolean title="default setting"></boolean>
  	  <boolean title="default true" :value=true></boolean>
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