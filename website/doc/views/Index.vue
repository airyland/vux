<template>
  <doc-header></doc-header>
  <doc-nav></doc-nav>
  <div class="doc-content">
    <div class="doc-content-document">
      <router-view />
    </div>
    <doc-demo-preview :url="demoUrl"></doc-demo-preview>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import {
  onBeforeRouteUpdate,
  RouteLocationNormalized,
  useRoute
} from 'vue-router';
import Header from '../components/Header.vue';
import Nav from '../components/Nav.vue';
import Footer from '../components/Footer.vue';
import DemoPreview from '../components/DemoPreview.vue';
import { currentRoute } from '../../assets/util/ref';
export default defineComponent({
  name: 'doc',
  components: {
    [Header.name]: Header,
    [Nav.name]: Nav,
    [Footer.name]: Footer,
    [DemoPreview.name]: DemoPreview
  },
  setup() {
    const data = reactive({
      demoUrl: 'demo.html'
    });

    const watchDemoUrl = (router: RouteLocationNormalized) => {
      const { origin, pathname } = window.location;
      currentRoute.value = router.name as string;
      data.demoUrl = `${origin}${pathname.replace('index.html', '')}demo.html#${
        router.path
      }`;
    };

    onMounted(() => {
      const route = useRoute();
      watchDemoUrl(route);
    });

    onBeforeRouteUpdate(to => {
      watchDemoUrl(to);
    });

    return data;
  }
});
</script>

<style lang="scss" scoped>
.doc {
  &-content {
    margin-left: 290px;
    display: flex;
    flex-direction: column;

    &-document {
      min-height: 800px;
    }
  }
}
</style>
