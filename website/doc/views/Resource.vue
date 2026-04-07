<template>
  <doc-header></doc-header>
  <div class="resource-main">
    <div class="resource-main-content">
      <h3 class="sub-title">资源</h3>
      <p class="sub-desc">这里汇总了Vux 相关的所有的资源</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../components/Header.vue'
export default defineComponent({
  name: 'doc',
  components: {
    [Header.name]: Header
  }
});
</script>

<style scoped>
.resource-main {
  background-color: #1d1d1d;
}
.resource-main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 48px;
  padding-bottom: 53px;
  background: url('../../assets/images/bg-article.png') no-repeat;
  background-size: 307px 200px;
  background-position: right 280px top 0;
}
.resource-main-content .sub-title {
  margin-left: 8px;
  margin-bottom: 40px;
  line-height: 36px;
  font-size: 30px;
  color: #ffffff;
}
.resource-main-content .sub-desc {
  line-height: 22px;
  font-size: 16px;
  color: #ffffff;
}
.resource-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 0;
}
.resource-block {
  margin-bottom: 50px;
  text-align: left;
}
.resource-block .sub-title {
  margin-bottom: 15px;
  line-height: 42px;
  font-size: 30px;
  color: #1a1a1a;
}
.resource-block .sub-desc {
  margin-bottom: 40px;
  line-height: 22px;
  font-size: 16px;
  color: #959fb1;
}
.resource-block .sub-red {
  color: #fa2c19;
}
.no-data {
  text-align: center;
}
.no-data .nodata-img-joy {
  width: 269px;
  height: 153px;
  margin-bottom: 30px;
}
.no-data .nodata-desc {
  font-size: 16px;
  color: #959fb1;
}
.tab-hd {
  display: flex;
  margin-bottom: 30px;
}
.tab-bd {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.tab-hd-item {
  margin-right: 40px;
  line-height: 25px;
  font-size: 18px;
  color: #808080;
  cursor: pointer;
}
.tab-hd-item:first-child {
  color: #1a1a1a;
}
.tab-hd-item.active {
  color: #e32c36;
}
.design-item {
  width: 280px;
  margin-right: 26px;
  margin-bottom: 45px;
  cursor: pointer;
}
.design-item:nth-child(4n) {
  margin-right: 0;
}
.design-item .img-design {
  width: 280px;
  height: 170px;
  margin-bottom: 20px;
  border-radius: 5px;
}
.design-title {
  width: 280px;
  height: 44px;
  line-height: 22px;
  font-size: 16px;
  color: #1d1d21;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.article-item {
  position: relative;
  padding-left: 34px;
  margin-bottom: 20px;
  color: #fa685d;
}
.article-item:before {
  content: '';
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -8px;
  width: 12px;
  height: 12px;
  border: 2px solid #fa2c19;
  border-radius: 50%;
}
.article-link {
  line-height: 22px;
  font-size: 14px;
  color: #fa685d;
  cursor: pointer;
}
</style>
