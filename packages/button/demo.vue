<template>
  <div class="demo">
    <h2>按钮类型</h2>
    <div class="demo-button-row">
      <vux-button type="primary">主要按钮</vux-button>
      <vux-button type="info">信息按钮</vux-button>
      <vux-button type="default">默认按钮</vux-button>
    </div>
    <div class="demo-button-row2">
      <vux-button type="danger">危险按钮</vux-button>
      <vux-button type="warning">警告按钮</vux-button>
      <vux-button type="success">成功按钮</vux-button>
    </div>
    <h2>禁用状态</h2>
    <div class="demo-button-row2">
      <vux-button disabled type="primary">禁用状态</vux-button>
      <vux-button plain disabled type="info">禁用状态</vux-button>
      <vux-button plain disabled type="primary">禁用状态</vux-button>
    </div>
    <h2>按钮形状</h2>
    <div class="demo-button-row2">
      <vux-button shape="square" type="primary">方形按钮</vux-button>
      <vux-button type="info">圆形按钮</vux-button>
    </div>
    <h2>加载状态</h2>
    <div class="demo-button-row2">
      <vux-button loading type="primary">加载中</vux-button>
      <vux-button loading type="warn">加载中</vux-button>
      <vux-button :loading="isLoading" type="success" @click="changeLoading"
        >Click me!</vux-button
      >
    </div>
    <h2>图标按钮</h2>
    <div class="demo-button-row2">
      <vux-button
        shape="square"
        type="primary"
        icon="waiting-circle"
      >等待</vux-button>
      <vux-button type="primary" icon="safe-warn">收藏</vux-button>
    </div>

    <h2>按钮尺寸</h2>
    <div class="demo-button-row2">
      <vux-button type="primary">普通按钮</vux-button>
      <vux-button size="mini" type="primary">小型按钮</vux-button>
    </div>
    <h2>块级元素</h2>
    <div class="demo-button-row2">
      <vux-button block type="primary">块级元素</vux-button>
    </div>
    <h2>自定义颜色</h2>
    <div class="demo-button-row2">
      <vux-button color="#7232dd">单色按钮</vux-button>
      <vux-button color="#7232dd" plain>单色按钮</vux-button>
      <vux-button color="linear-gradient(to right, #ff6034, #ee0a24)">
        渐变按钮
      </vux-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'demo-button',
  props: {},
  setup(props) {
    let isLoading = ref(false);
    const changeLoading = () => {
      isLoading.value = true;
      setTimeout(() => {
        isLoading.value = false;
      }, 3000);
    };

    return {
      isLoading,
      changeLoading
    };
  }
});
</script>

<style lang="scss" scoped>
.demo-button-row {
  margin-bottom: 20px;
}
.demo-button-row2 {
  margin-bottom: 10px;
}
.vux-button {
  margin-right: 15px;
  &:last-child {
    margin-bottom: 0;
    margin-right: 0;
  }
}
</style>
