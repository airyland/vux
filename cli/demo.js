let demoModel = function(nameLc, author, desc) {
  let temp = {
    demo: `
<template>
  <div class="demo">
    <h2>基础用法</h2>
    <vux-cell>
      <vux-${nameLc}></vux-${nameLc}>
    </vux-cell>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'demo-${nameLc}',
  props: {},
  setup() {
    return {};
  }
});
</script>
  `,
    vue: `
<template>
  <div @click="handleClick">
    <div>{{ name }}</div>
    <div>{{ txt }}</div>
  </div>
</template>
<script lang="ts">
import { toRefs } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'vux-${nameLc}',
  props: {
    name: {
      type: String,
      default: ''
    },
    txt: {
      type: String,
      default: ''
    }
  },
  components: {},
  emits: ['click'],

  setup(props, { emit }) {

    const { name, txt } = toRefs(props);

    const handleClick = (event: Event) => {
      emit('click', event);
    };

    return { name, txt, handleClick };
  }
});
</script>
  `,
    index: `
import { SFCWithInstall } from '../utils/types'
import { App } from 'vue'
import ${nameLc} from './src/index.vue'

${nameLc}.install = (app: App): void => {
  app.component(${nameLc}.name, ${nameLc})
}

const _${nameLc}: SFCWithInstall<typeof ${nameLc}> = ${nameLc}

export default _${nameLc}
`,
    doc: `#  ${nameLc} 组件

### 介绍

${desc}

### 安装

${''}

## 代码演示

### 基础用法1



## API

### Props

| 参数         | 说明                             | 类型   | 默认值           |
|--------------|----------------------------------|--------|------------------|
| name         | 图标名称或图片链接               | String | -                |
| color        | 图标颜色                         | String | -                |
| size         | 图标大小，如 '20px' '2em' '2rem' | String | -                |
| class-prefix | 类名前缀，用于使用自定义图标     | String | 'vux-iconfont' |
| tag          | HTML 标签                        | String | 'i'              |

### Events

| 事件名 | 说明           | 回调参数     |
|--------|----------------|--------------|
| click  | 点击图标时触发 | event: Event |
    `,
    package: `
{
  "name": "@vux/${nameLc}",
  "author": "${author}",
  "version": "0.0.0",
  "main": "dist/index.js",
  "license": "MIT",
  "peerDependencies": {
    "vue": "^3.0.7"
  },
  "devDependencies": {
    "@vue/test-utils": "^2.0.0-beta.3"
  }
}
    `
  };

  return temp;
};
module.exports = demoModel;
