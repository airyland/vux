import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '../assets/styles/reset.scss';
import '../assets/styles/md-style.scss';

import '../../packages/theme-chalk/weui.less'
import 'vite-plugin-vuedoc/style.css'
import Vux from '../../packages/vux/index'

createApp(App)
  .use(router)
  .use(Vux)
  .mount('#doc');
