<template>
  <div>
  <h1>贡献者列表<span class="count"> (目前有 <code>{{ contributors.length }}</code> 个有为青年贡献了代码)</span></h1>
  <div class="tip">
  无论是编辑文档还是提交代码都可以帮助 VUX 做得更好。
  </div>
  <ul class="list">
    <li v-for="user in contributors">
      <a :href="user.html_url" target="_blank" class="link">
        <img :src="user.avatar_url" class="avatar">
        <br>
        <span>{{ user.login }}</span>
      </a>
    </li>
  </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState }  from 'vuex'
export default {
  preFetch ({ store }) {
    return store.dispatch('updateContributors')
  },
  computed: mapState(['contributors']),
  head: {
    title: 'VUX 贡献者列表'
  }
}
</script>

<style scoped>
.link {
  color: #000;
  display: inline-block;
  width: 120px;
}
.count {
  font-size: 14px;
}
.list {
  list-style: none;
  padding-left: 0;
}
.list li {
  margin: 0;
  text-align: center;
  float: left;
  padding: 15px 15px 15px 0;
}
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 40px;
}
</style>
