<template>
  <div class="doc-header">
    <a class="header-logo" href="#">
      <span class="logo-link"></span>
      <span class="logo-title">vux</span>
    </a>
    <div class="header-nav">
      <div class="nav-box">
        <ul class="nav-list">
          <li class="nav-item" v-for="item in header" :key="item.name" :class="{ active: isActive(item) }">
            <a v-if="item.link" :href="item.link">{{ item.cName }}</a>
            <router-link v-else :to="handlePath(item)">
              {{ item.cName }}
            </router-link>
          </li>
          <li class="nav-item">
            <a
              class="user-link"
              target="_blank"
              href="https://github.com/airyland/vux"
            ></a>
          </li>
          <Search />
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, onMounted, watch, ref } from 'vue';
import Search from './Search.vue';
import { header, nav  } from '../../../vux-config.json';
import { currentRoute, themeColor } from '../../assets/util/ref';
import { useRoute  } from "vue-router"
export default defineComponent({
  name: 'doc-header',
  components: {
    Search
  },
  setup() {
    const data = reactive({
      theme: 'black',
      verson: '3.x',
      navIndex: 0,
      activeIndex: 0,
      isShowSelect: false
    });
    const currentRouteName = ref()
    const isActive = (item) => {
      if (item.name === 'component') {
        for (var i = 0; i < nav.length; i++) {
          for (var j = 0; j < nav[i].packages.length; j++) {
            if (nav[i].packages[j].name.toLowerCase() === currentRouteName.value) {
              return true
            }
          }
        }
        return false
      } else {
        return item.path === `/${currentRouteName.value}`
      }
    };
    const handlePath = (item) => {
      if (item.path) return item.path
      return `/${nav[0].packages[0].name.toLowerCase()}`
    }
    // 监听路由变化
    const route = useRoute()
    watch(() => route.path, (path) => {
      const name = path.split('/')[1]
      currentRouteName.value = name
    }, { immediate: true })
    return {
      header,
      data,
      isActive,
      handlePath
    };
  }
});
</script>

<style>
.doc-header {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  min-width: 1300px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: var(--doc-header-height);
  line-height: var(--doc-header-height);
  text-align: left;
  padding: 0 50px;
  font-size: 20px;
  background-color: #42b983;
  color: #fff;
}
.header-select-box.select-down .header-select-hd {
  background-image: url('../../assets/images/icon-select-white-down.png');
}
.header-select-box.select-up .header-select-hd {
  background-image: url('../../assets/images/icon-select-white-up.png');
}
.header-select-hd {
  color: var(--theme-red-word);
  border: 1px solid var(--theme-white-select-border);
}
.header-select-bd {
  color: var(--theme-white-select-word);
}
.header-select-item {
  border-color: var(--theme-red-select-border);
  background-color: var(--theme-red-select-bg);
}
.header-select-item:hover {
  color: var(--theme-red);
}
.header-logo {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 64px;
  cursor: pointer;
}
.header-logo .logo-link {
  display: inline-block;
  width: 46px;
  height: 46px;
  vertical-align: middle;
  position: absolute;
  top: 50%;
  margin-top: -23px;
  background: url('/logo.svg') no-repeat center/100%;
}
.header-logo .logo-title {
  position: absolute;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  right: 0;
  font-size: 30px;
  color: #fff;
}
.header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  float: right;
  padding: 0 40px;
}
.header-nav .nav-box .nav-list {
  min-width: 445px;
  display: flex;
  list-style: none;
  align-items: center;
  justify-content: space-around;
}
.header-nav .nav-box .nav-item {
  position: relative;
  margin-right: 30px;
  font-size: 14px;
  height: 63px;
  line-height: 63px;
  text-align: center;
  cursor: pointer;
  color: #fff;
}
.header-nav .nav-box .nav-item a {
  display: inline-block;
  line-height: 64px;
  color: #fff;
}
.header-nav .nav-box .nav-item.active {
  font-weight: bold;
}
.header-nav .nav-box .nav-item.active:after {
  content: '';
  display: inline-block;
  width: 35px;
  height: 13px;
  position: absolute;
  bottom: 3px;
  left: 50%;
  margin-left: -17.5px;
  background: url('../../assets/images/item-active.png');
  background-position: 0 0;
}
.header-nav .nav-box .nav-item:last-of-type {
  margin-right: 0;
}
.header-nav .nav-box .user-link {
  display: inline-block;
  width: 26px;
  height: 26px;
  vertical-align: middle;
  background: url('../../assets/images/icon-user.png') no-repeat;
  background-size: 26px;
  background-position: 0 0;
}
.search-box .search-input {
  color: var(--theme-red-word);
  background-position: 0 0;
}
.search-box .search-input::-webkit-input-placeholder {
  color: var(--theme-red-input);
}
.header-select-box {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  outline: 0;
}
.header-select-hd {
  min-width: 77px;
  height: 28px;
  padding: 0 30px 0 15px;
  line-height: 26px;
  font-size: 14px;
  color: var(--theme-red-word);
  background-position: right 15px top 12px;
  background-size: 8px 5px;
  background-repeat: no-repeat;
  border-radius: 14px;
}
.header-select-bd {
  position: absolute;
  top: 30px;
  border-radius: 3px;
  overflow: hidden;
}
.header-select-item {
  width: 77px;
  height: 28px;
  padding: 0 12px;
  line-height: 26px;
  font-size: 14px;
  border-width: 0px 1px 1px;
  border-style: solid;
  cursor: pointer;
}
.header-select-item:first-of-type {
  border-top-width: 1px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
