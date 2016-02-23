<template>
<div>
	<group title="default">
		<radio :options="radio001" @change="change"></radio>
	</group>

	<group title="preselect 'China'">
		<radio :options="radio001" value="China"></radio>
	</group>

	<group :title="'fill mode value is '+radio001Value">
		<radio fill-mode :options="radio001" :value.sync="radio001Value" @change="change"></radio>
	</group>
	  
	<group title="fill mode with custom placeholder and label">
		<radio fill-mode fill-label="Other" fill-placeholder="填写其他的哦" :options="radio001" @change="change"></radio>
	</group>
</div>
</template>

<script>
import {
  Radio,
  Group,
  DevTip
} from '../components/'
export default {
  components: {
    Radio,
    Group,
    DevTip
  },
  data: function () {
    return {
      radio001: [ 'China', 'Japan' ],
      radio001Value: 'China',
      radio002Value: 'Japan'
    }
  },
  methods: {
    change: function (value) {
      console.log('change:', value)
    },
    processButton001: function () {
      this.submit001 = 'processing'
      this.disable001 = true
    }
  }
}
</script>