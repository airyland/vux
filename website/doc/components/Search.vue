<template>
  <div class="search-box">
    <input
      type="text"
      class="search-input"
      placeholder="在 Vux 中搜索"
      v-model="data.searchVal"
      @focus="onfocus"
      @blur="onblur"
      @keyup="choseList"
    />
    <ul class="search-list" v-show="data.searchList.length > 0">
      <li
        :class="data.searchCurName == item.name ? 'cur' : ''"
        @click="checklist(item)"
        v-for="(item, index) in data.searchList"
        :key="index"
      >
        <router-link :to="item.name.toLowerCase()">
          {{ item.name }}
          <span>{{ item.cName }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { defineComponent, reactive, onMounted, watch } from 'vue';
import { nav } from '../../../vux-config.json';
import { useRouter } from "vue-router";
export default defineComponent({
  name: 'search',
  setup() {
    const data = reactive({
      nav,
      navList: [],
      searchIndex: 0,
      searchList: [],
      searchVal: '',
      searchCName: ''
    });
    onMounted(() => {
      nav.forEach(item => {
        item.packages.forEach(value => {
          data.navList.push(value);
        });
      });
    });
    watch(
      () => data.searchVal,
      sVal => {
        if (sVal) {
          data.searchList = data.navList.filter(item => {
            if (item.show === false) return false;
            const rx = new RegExp(sVal, 'gi');
            return rx.test(item.name + ' ' + item.cName + '' + item.desc);
          });
        } else {
          data.searchCName = '';
          data.searchIndex = 0;
          data.searchList = [];
        }
      }
    );
    const onfocus = e => {
      // e.target.select();
    };
    const onblur = e => {
      setTimeout(() => {
        data.searchList = [];
        data.searchVal = '';
      }, 200);
    };
    const checklist = () => {
      data.searchVal = '';
      data.searchCurName = '';
      data.searchIndex = 0;
    };
    const router = useRouter()
    const choseList = e => {
      let searchIndex = data.searchIndex;
      if (e.keyCode == 40) {
        searchIndex++;
      }
      if (e.keyCode == 38) {
        searchIndex--;
      }
      if (searchIndex < 0) {
        searchIndex = 0;
      }
      const searchList = data.searchList;
      if (searchList.length > 0) {
        const cName = searchList[searchIndex] && searchList[searchIndex].name;
        if (cName) {
          data.searchCurName = cName;
          data.searchIndex = searchIndex;
          if (e.keyCode == 13) {
            router.push({
              path: '/' + searchList[searchIndex].name
            });
            data.searchCurName = '';
            data.searchIndex = 0;
            data.searchVal = '';
          }
        }
      }
    };
    return {
      data,
      onfocus,
      choseList,
      onblur,
      checklist
    };
  }
});
</script>
<style lang="scss">
.search-box {
  position: relative;
  margin-left: 30px;
  height: 22px;
  line-height: 22px;
  .search-input {
    height: 22px;
    padding-left: 42px;
    font-size: 14px;
    vertical-align: middle;
    background: transparent url('../../assets/images/input-search.png')
      no-repeat;
    font-size: 14px;
    color: #fff;
    &:focus {
      outline: none;
    }
  }
}
.search-list {
  background: #fff;
  position: absolute;
  width: 300px;
  list-style: none;
  border: 1px solid #f2f2f2;
  z-index: 99999;
  top: 27px;
  padding: 0;
  li {
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    a {
      display: inline-block;
      box-sizing: border-box;
      width: 100%;
      padding-left: 40px;
      text-decoration: none;
      color: #666;
    }
    &:hover {
      color: #42b983;
      a {
        color: #42b983;
      }
    }
  }
  .cur {
    background: #42b983;
    color: #fff;
    &:hover {
      color: #fff;
      font-weight: bold;
      a {
        color: #fff;
      }
    }
    a {
      color: #fff;
    }
  }
}
</style>
