<template>
  <div>
    <box gap="10px 0">
      <div v-for="one in milestones" class="milestone-box ui-border-tb">
        <p class="milestone-title">v{{one.milestone}}</p>
        <ul>
          <li v-for="issue in one.list">
            <p><icon :type="issue.state==='open' ? 'circle' : 'success_circle'" class="icon"></icon><span>{{issue.title}}</span></p>
          </li>
        </ul>
      </div>
    </box>
  </div>
</template>

<script>
import { Box, Icon } from '../components/'
const milestones = require('../../build/milestone.json')
export default {
  components: {
    Box,
    Icon
  },
  data () {
    return {
      milestones: milestones
    }
  }
}
</script>

<style scoped>
.milestone-title {
  margin-bottom: 10px;
  color: #04BE02;
}
.milestone-box {
  margin-top: 15px;
  background-color: #fff;
  padding: 10px;
}
.icon:before {
  font-size: 18px;
  line-height: 25px;
}
li > p > span {
  color: #555;
  line-height: 25px;
  padding-left: 5px;
}
</style>