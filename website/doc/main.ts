import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '../../src/styles/variables.css';
import '../../src/styles/main.css';
import '../assets/styles/reset.css';
import '../assets/styles/highlight.css';
import '../assets/styles/md-style.css';

import '../../packages/theme-chalk/weui.less'
import 'vite-plugin-vuedoc/style.css'
import Vux from '../../packages/vux/index'

createApp(App)
  .use(router)
  .use(Vux)
  .mount('#doc');
