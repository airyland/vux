<template>
  <div class="doc-footer" :class="`doc-footer-${data.theme}`">
    <div class="doc-footer-content">
      <div class="doc-footer-list">
        <img
          class="doc-footer-logo"
          src="../../assets/images/logo-header-red.png"
        />
      </div>
      <div class="doc-footer-list">
        <h4 class="doc-footer-title">相关资源</h4>
        <div class="doc-footer-item"
          ><a class="sub-link" target="_blank" href="https://ling.jd.com/jdw"
            >羚珑-中后台智能构建平台</a
          ></div
        >
        <div class="doc-footer-item"
          ><a class="sub-link" target="_blank" href="https://taro-ui.jd.com"
            >Taro UI</a
          ></div
        >
        <div class="doc-footer-item"
          ><a class="sub-link" target="_blank" href="https://vitejs.dev"
            >Vite</a
          ></div
        >
        <div class="doc-footer-item"
          ><a
            class="sub-link"
            target="_blank"
            href="hhttps://cn.vuejs.org/index.html"
            >Vue</a
          ></div
        >
      </div>
      <div class="doc-footer-list">
        <h4 class="doc-footer-title">社区</h4>
        <div class="doc-footer-item"
          ><a
            class="sub-link"
            target="_blank"
            href="https://github.com/jdf2e/nutui"
            >GitHub</a
          ></div
        >
        <div class="doc-footer-item"
          ><a
            class="sub-link"
            target="_blank"
            href="https://www.zhihu.com/column/c_1263837684834889728"
            >NUT UI 知乎专栏</a
          ></div
        >
        <div class="doc-footer-item vx-item">
          微信
          <i class="icon-vx"></i>
          <div class="vx-box">
            <p class="vx-desc">微信交流群</p>
            <p class="vx-desc">扫码添加好友</p>
            <img class="img-code" src="../../assets/images/vx-code.png" />
            <p class="vx-desc">回复<span class="vx-red">NutUI</span>即刻进群</p>
          </div>
        </div>
      </div>
      <div class="doc-footer-list">
        <h4 class="doc-footer-title">关于我们</h4>
        <div class="doc-footer-item"
          ><a
            class="sub-link"
            target="_blank"
            href="https://nutui.jd.com/#/joinus"
            >加入我们</a
          ></div
        >
        <div class="doc-footer-item"
          ><a class="sub-link" target="_blank" href="http://fe.jd.com"
            >京东零售前端</a
          ></div
        >
        <div class="doc-footer-item"
          ><a class="sub-link" target="_blank" href="nutui@jd.com"
            >联系我们</a
          ></div
        >
      </div>
      <div
        class="doc-footer-list"
        @click.stop="data.isShowSelect = !data.isShowSelect"
      >
        <div class="doc-footer-select-hd"
          ><i class="icon-color"></i>主题换肤</div
        >
        <div class="doc-footer-select-bd" v-show="data.isShowSelect">
          <div
            class="doc-footer-select-item"
            v-for="(item, index) in data.themeList"
            :key="index"
            @click.stop="checkTheme(item.color, index)"
            :class="{ active: data.activeIndex === index }"
          >
            <i :class="`circle-${item.color}`"></i>{{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <p class="doc-footer-desc"
      >2021 京东零售 - 基础业务体验部.All Rights Reserved.</p
    >
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { themeColor } from '../../assets/util/ref';
export default defineComponent({
  name: 'doc-footer',
  setup() {
    const data = reactive({
      theme: 'red',
      themeList: [
        {
          name: '热情红',
          color: 'red'
        },
        {
          name: '暗黑风',
          color: 'black'
        },
        {
          name: '纯净白',
          color: 'white'
        }
      ],
      activeIndex: 0,
      isShowSelect: false
    });
    const clickOut = () => {
      document.addEventListener(
        'click',
        e => {
          console.log('e.target', e.target);
        },
        false
      );
    };
    const checkTheme = (color: string, index: number) => {
      data.isShowSelect = false;
      data.activeIndex = index;
      data.theme = color;
      themeColor.value = color;
    };
    return {
      data,
      clickOut,
      checkTheme
    };
  }
});
</script>

<style>
.doc-footer {
  padding: 30px 80px 20px;
  text-align: center;
}
.doc-footer-content {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-right: 50px;
}
.doc-footer-list {
  position: relative;
}
.doc-footer-list:first-child {
  margin-right: 65px;
}
.doc-footer-logo {
  margin-top: 8px;
}
.doc-footer-title {
  margin-bottom: 24px;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
}
.doc-footer-item {
  margin-bottom: 14px;
  line-height: 17px;
  font-size: 12px;
  text-align: left;
  cursor: pointer;
}
.doc-footer-desc {
  font-size: 12px;
}
.doc-footer-select-hd {
  width: 92px;
  height: 32px;
  padding: 0 10px;
  line-height: 32px;
  font-size: 12px;
  text-align: left;
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
  cursor: pointer;
}
.doc-footer-select-bd {
  position: absolute;
  border-radius: 2px;
  text-align: left;
}
.doc-footer-select-item {
  width: 92px;
  height: 32px;
  padding: 0 10px;
  line-height: 32px;
  font-size: 12px;
  border-width: 0px 1px 1px;
  border-style: solid;
  border-radius: 2px;
  cursor: pointer;
}
.icon-color {
  display: inline-block;
  width: 12px;
  height: 10px;
  margin-right: 10px;
  background: url('../../assets/images/icon-color.png') no-repeat
    center/100%;
}
.circle-red,
.circle-black,
.circle-white {
  position: relative;
  top: -1px;
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 10px;
  border-radius: 50%;
  vertical-align: middle;
}

/* Black theme */
.doc-footer-black {
  background: var(--theme-black-footer-bg);
  border-top: 1px solid var(--theme-black-footer-border);
}
.doc-footer-black .doc-footer-title {
  color: var(--theme-black-footer-word1);
}
.doc-footer-black .doc-footer-item {
  color: var(--theme-black-footer-word2);
}
.doc-footer-black .doc-footer-item .sub-link {
  color: var(--theme-black-footer-word2);
}
.doc-footer-black .doc-footer-desc {
  color: var(--theme-black-footer-word4);
}
.doc-footer-black .doc-footer-select-hd {
  color: var(--theme-black-footer-word2);
  border-color: var(--theme-black-theme-border);
}
.doc-footer-black .doc-footer-select-hd:hover {
  color: var(--theme-black-footer-hover);
}
.doc-footer-black .doc-footer-select-item {
  color: var(--theme-black-footer-word2);
  border-color: var(--theme-black-theme-border);
}
.doc-footer-black .doc-footer-select-item .circle-red {
  background: var(--theme-red-gradient);
}
.doc-footer-black .doc-footer-select-item .circle-black {
  background: var(--theme-black-circle);
  border: 1px solid var(--theme-black-theme-border);
}
.doc-footer-black .doc-footer-select-item .circle-white {
  background: var(--theme-white-circle);
}
.doc-footer-black .doc-footer-select-item:hover {
  background-color: var(--theme-black-theme-border);
}
.doc-footer-black .doc-footer-select-item:hover .circle-black {
  border-color: var(--theme-black-circle);
}
.doc-footer-black .doc-footer-select-item.active {
  background-color: var(--theme-black-footer-hover);
  border-color: var(--theme-black-footer-hover);
}
.doc-footer-black .doc-footer-select-item.active .circle-red {
  border: 1px solid var(--theme-red-border);
}
.doc-footer-black .doc-footer-select-item.active .circle-black {
  border-color: var(--theme-black-footer-bg);
}

/* White and Red theme */
.doc-footer-white,
.doc-footer-red {
  background: var(--theme-white-footer-bg);
  border-top: 1px solid var(--theme-white-footer-border);
}
.doc-footer-white .doc-footer-title,
.doc-footer-red .doc-footer-title {
  color: var(--theme-white-footer-word1);
}
.doc-footer-white .doc-footer-item,
.doc-footer-red .doc-footer-item {
  color: var(--theme-white-footer-word2);
}
.doc-footer-white .doc-footer-item .sub-link,
.doc-footer-red .doc-footer-item .sub-link {
  color: var(--theme-white-footer-word2);
}
.doc-footer-white .doc-footer-desc,
.doc-footer-red .doc-footer-desc {
  color: var(--theme-white-footer-word4);
}
.doc-footer-white .doc-footer-select-hd,
.doc-footer-red .doc-footer-select-hd {
  color: var(--theme-white-footer-word2);
  border-color: var(--theme-white-theme-border);
}
.doc-footer-white .doc-footer-select-hd:hover,
.doc-footer-red .doc-footer-select-hd:hover {
  color: var(--theme-white-footer-hover);
}
.doc-footer-white .doc-footer-select-item,
.doc-footer-red .doc-footer-select-item {
  color: var(--theme-white-footer-word2);
  border-color: var(--theme-white-theme-border);
}
.doc-footer-white .doc-footer-select-item .circle-red,
.doc-footer-red .doc-footer-select-item .circle-red {
  background: var(--theme-red-gradient);
}
.doc-footer-white .doc-footer-select-item .circle-black,
.doc-footer-red .doc-footer-select-item .circle-black {
  background: var(--theme-black-circle);
  border: 1px solid var(--theme-black-circle);
}
.doc-footer-white .doc-footer-select-item .circle-white,
.doc-footer-red .doc-footer-select-item .circle-white {
  background: var(--theme-white-circle);
  border: 1px solid var(--theme-white-circle-border);
}
.doc-footer-white .doc-footer-select-item:hover,
.doc-footer-red .doc-footer-select-item:hover {
  color: var(--theme-white-footer-word3);
  background-color: var(--theme-white-theme-border);
}
.doc-footer-white .doc-footer-select-item:hover .circle-black,
.doc-footer-red .doc-footer-select-item:hover .circle-black {
  border-color: var(--theme-black-circle);
}
.doc-footer-white .doc-footer-select-item.active,
.doc-footer-red .doc-footer-select-item.active {
  color: var(--theme-white);
  background-color: var(--theme-white-footer-hover);
  border-color: var(--theme-white-footer-hover);
}
.doc-footer-white .doc-footer-select-item.active .circle-red,
.doc-footer-red .doc-footer-select-item.active .circle-red {
  border: 1px solid var(--theme-red-border);
}
.doc-footer-white .doc-footer-select-item.active .circle-black,
.doc-footer-red .doc-footer-select-item.active .circle-black {
  border-color: var(--theme-black-circle);
}
.doc-footer-white .doc-footer-select-item.active .circle-white,
.doc-footer-red .doc-footer-select-item.active .circle-white {
  border-color: var(--theme-white-circle);
}

.vx-item {
  position: relative;
}
.vx-item:hover .vx-box {
  display: block;
}
.icon-vx {
  display: inline-block;
  width: 13px;
  height: 13px;
  margin-left: 5px;
  vertical-align: -2px;
  background: url('../../assets/images/icon-footer-vx.png') no-repeat
    center/100%;
}
.vx-box {
  display: none;
  position: absolute;
  right: -144px;
  top: -160px;
  padding: 20px 30px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  box-shadow: 0px 2px 4px 0px rgba(143, 143, 143, 0.5);
}
.vx-box .vx-desc {
  margin-bottom: 10px;
  line-height: 17px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #1a1a1a;
}
.vx-box .vx-desc:last-child {
  margin-bottom: 0;
}
.vx-box .img-code {
  width: 121px;
  height: 121px;
  margin-bottom: 10px;
}
.vx-box .vx-red {
  margin: 0 4px;
  font-weight: bold;
  color: #fa2c19;
}
</style>
