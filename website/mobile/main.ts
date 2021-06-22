import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '../assets/styles/reset.scss';
import Vux from '../../packages/vux/index'
import '../../packages/theme-chalk/weui.less'

console.log(router)
createApp(App)
  .use(router)
  .use(Vux)
  .mount('#example');
