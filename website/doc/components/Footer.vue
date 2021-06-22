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
      //点击组件以外的地方，收起
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
      console.log('themeColor1', themeColor);
      // bus.emit('select-theme', color)
    };
    return {
      data,
      clickOut,
      checkTheme
    };
  }
});
</script>

<style lang="scss">
.doc {
  &-footer {
    padding: 30px 80px 20px;
    text-align: center;
    &-content {
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      margin-right: 50px;
    }
    &-list {
      position: relative;
      &:first-child {
        margin-right: 65px;
      }
    }
    &-logo {
      margin-top: 8px;
    }
    &-title {
      margin-bottom: 24px;
      font-size: 16px;
      font-weight: bold;
      text-align: left;
    }
    &-item {
      margin-bottom: 14px;
      line-height: 17px;
      font-size: 12px;
      text-align: left;
      cursor: pointer;
      .sub-link {
        // cursor: pointer;
      }
    }
    &-desc {
      font-size: 12px;
    }
    &-select-hd {
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
    &-select-bd {
      position: absolute;
      border-radius: 2px;
      text-align: left;
    }
    &-select-item {
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
  }
}
// 颜色
.doc-footer {
  height: 240px;
  // 黑色
  &-black {
    background: $theme-black-footer-bg;
    border-top: 1px solid $theme-black-footer-border;
    .doc-footer {
      &-title {
        color: $theme-black-footer-word1;
      }
      &-item {
        color: $theme-black-footer-word2;
        .sub-link {
          color: $theme-black-footer-word2;
        }
      }
      &-desc {
        color: $theme-black-footer-word4;
      }
      &-select-hd {
        color: $theme-black-footer-word2;
        // background: rgba(29, 29, 33, 1);
        border-color: $theme-black-theme-border;
        &:hover {
          color: $theme-black-footer-hover;
        }
      }
      &-select-item {
        color: $theme-black-footer-word2;
        // background: rgba(29, 29, 33, 1);
        border-color: $theme-black-theme-border;
        .circle-red {
          background: $theme-red-gradient;
        }
        .circle-black {
          background: $theme-black-circle;
          border: 1px solid $theme-black-theme-border;
        }
        .circle-white {
          background: $theme-white-circle;
        }
        &:hover {
          background-color: $theme-black-theme-border;
          .circle-black {
            border-color: $theme-black-circle;
          }
        }
        &.active {
          background-color: $theme-black-footer-hover;
          border-color: $theme-black-footer-hover;
          .circle-red {
            border: 1px solid $theme-red-border;
          }
          .circle-black {
            border-color: $theme-black-footer-bg;
          }
        }
      }
    }
  }
  // 白色、红色
  &-white,
  &-red {
    background: $theme-white-footer-bg;
    border-top: 1px solid $theme-white-footer-border;
    .doc-footer {
      &-title {
        color: $theme-white-footer-word1;
      }
      &-item {
        color: $theme-white-footer-word2;
        .sub-link {
          color: $theme-white-footer-word2;
        }
      }
      &-desc {
        color: $theme-white-footer-word4;
      }
      &-select-hd {
        color: $theme-white-footer-word2;
        // background: rgba(29, 29, 33, 1);
        border-color: $theme-white-theme-border;
        &:hover {
          color: $theme-white-footer-hover;
        }
      }
      &-select-item {
        color: $theme-white-footer-word2;
        // background: rgba(29, 29, 33, 1);
        border-color: $theme-white-theme-border;
        .circle-red {
          background: $theme-red-gradient;
        }
        .circle-black {
          background: $theme-black-circle;
          border: 1px solid $theme-black-circle;
        }
        .circle-white {
          background: $theme-white-circle;
          border: 1px solid $theme-white-circle-border;
        }
        &:hover {
          color: $theme-white-footer-word3;
          background-color: $theme-white-theme-border;
          .circle-black {
            border-color: $theme-black-circle;
          }
        }
        &.active {
          color: $theme-white;
          background-color: $theme-white-footer-hover;
          border-color: $theme-white-footer-hover;
          .circle-red {
            border: 1px solid $theme-red-border;
          }
          .circle-black {
            border-color: $theme-black-circle;
          }
          .circle-white {
            border-color: $theme-white-circle;
          }
        }
      }
    }
  }
}
.vx-item {
  position: relative;
  &:hover {
    .vx-box {
      display: block;
    }
  }
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
  .vx-desc {
    margin-bottom: 10px;
    line-height: 17px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #1a1a1a;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .img-code {
    width: 121px;
    height: 121px;
    margin-bottom: 10px;
  }
  .vx-red {
    margin: 0 4px;
    font-weight: bold;
    color: #fa2c19;
  }
}
</style>
