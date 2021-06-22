<template>
  <div class="index">
    <div class="index-header">
      <img src="/logo.svg" />
      <div class="info">
        <h1>Vux</h1>
        <p>轻量级移动端 Vue 组件库</p>
      </div>
    </div>
    <div class="index-components">
      <ol v-for="_nav in nav" :key="_nav">
        <li>{{ _nav.name }}</li>
        <ul>
          <template v-for="_package in _nav.packages" :key="_package">
            <li v-if="_package.show">
              <router-link :to="_package.name.toLowerCase()">{{ _package.name }}&nbsp;&nbsp;{{ _package.cName }}</router-link>
              <vux-icon size="14" color="#979797" name="arrow"></vux-icon>
            </li>
          </template>
        </ul>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { nav } from '../../../vux-config.json';
export default defineComponent({
  name: 'doc',
  setup() {
    return reactive({
      nav
    });
  }
});
</script>
<style lang="scss" scoped>
.index {
  height: 100%;
  width: 100%;
  padding-top: 30px;

  &-header {
    display: flex;
    align-items: center;
    padding: 0 34px;
    height: 117px;
    > img {
      width: 67px;
      height: 67px;
      margin-right: 18px;
      flex-shrink: 0;
    }
    .info {
      display: flex;
      flex-direction: column;
      h1 {
        height: 48px;
        line-height: 48px;
        font-size: 34px;
        color: rgba(51, 51, 51, 1);
      }
      p {
        height: 18px;
        line-height: 18px;
        font-size: 12px;
        color: rgba(154, 155, 157, 1);
      }
    }
  }
  &-components {
    background: #fff;
    border-radius: 30px 30px 0 0;
    overflow: hidden;
    padding: 30px 25px;
    > ol {
      margin-bottom: 17px;
      > li {
        line-height: 20px;
        font-size: 12px;
        color: rgba(144, 156, 164, 1);
        margin-bottom: 10px;
        color: #337EFF;
      }
      > ul {
        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
          padding: 0 20px;
          height: 40px;
          margin-bottom: 10px;
          background: rgba(245, 246, 247, 0.8);
          border-radius: 24px;
          font-size: 14px;
          color: #333;
          font-weight: 500;
          a {
            width: 100%;
            font-size: 15px;
            display: block;
            color: rgba(51, 51, 51, 1);
          }
        }
      }
    }
  }
}
</style>
