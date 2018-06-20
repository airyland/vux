import Vue, { Component, ComponentOptions, VueConstructor, PluginObject } from 'vue';
import { VuxPlugins } from './plugins';

export * from './components';

export { AlertPlugin, LoadingPlugin, ToastPlugin } from './plugins';

export * from './tools';
// export * from './tools';

export {} from './utils';

declare module 'vue/types/vue' {
  interface Vue {
    $vux: VuxPlugins;
  }

  interface VueConstructor {
    $vux: VuxPlugins;
  }
}
