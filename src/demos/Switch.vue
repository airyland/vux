<template>
	<group title="boolean elements">
	  <boolean title="default setting"></boolean>
	  <boolean title="default true" :value=true></boolean>
	</group>
</template>

<script>
	import Boolean from '../components/Boolean'
	import Group from '../components/Group'
	export default {
		components: {
			Boolean,
			Group
		}
	}
</script>