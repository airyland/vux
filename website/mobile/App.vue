<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { isMobile } from '../assets/util';
export default defineComponent({
  name: 'app',
  setup() {
    const title = ref('NutUI');
    // 获取当前路由
    const route = useRoute();
    const router = useRouter();

    //返回demo页
    const goBack = () => {
      router.back();
    };
    // 当当前路由发生变化时，调用回调函数
    watch(
      () => route,
      () => {
        // const { origin, hash, pathname } = window.top.location;
        const { hash } = window.top.location;
        if (!isMobile && route.hash != hash) {
          // window.top.location.replace(`${origin}${pathname}#/${route.hash}`);
          title.value = route.name as string;
        } else {
          title.value = route.name as string;
        }
      },
      {
        immediate: true,
        deep: true
      }
    );

    return { title, goBack };
  }
});
</script>

<style>
html *::-webkit-scrollbar {
  width: 4px;
  height: 4px;
  background-color: #fff;
}
html *::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background-color: rgba(153, 153, 153, 0.6);
}
#app {
  background: #fff;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
#app #nav {
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  height: 57px;
  line-height: 57px;
  text-align: center;
  background: #ffffff;
  font-weight: bold;
  font-size: 20px;
  color: rgba(51, 51, 51, 1);
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.07);
}
#app #nav .back {
  position: absolute;
  left: 0;
  height: 100%;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
#app .demo {
  height: 100%;
  background: #f7f8fa;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 57px 17px 0 17px;
}
#app .demo.full {
  padding: 57px 0 0 0;
}
#app .demo.full h2 {
  padding-left: 17px;
}
#app .demo.bg-w {
  background: #fff;
}
#app .demo::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
#app .demo > h2 {
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 14px;
  color: rgba(144, 156, 164, 1);
  padding: 0 10px;
  font-weight: normal;
}
#app .demo > p {
  font-size: 12px;
}
#app .demo .card {
  padding: 25px 18px;
  background: rgba(255, 255, 255, 1);
}
</style>
