# VUX Vue2 → Vue3 迁移指南

> 文档版本：v1.0
> 创建日期：2026-04-09
> 目标版本：v3.0.0
> 状态：草稿

---

## 一、迁移概述

### 1.1 迁移目标

| 目标 | 说明 |
| ---- | ---- |
| **100% API 兼容** | 现有 v2 用户升级无需修改业务代码 |
| **平滑迁移** | 提供渐进式迁移路径 |
| **类型安全** | 完整 TypeScript 类型定义 |
| **SSR 支持** | 支持 Nuxt 3 / Vite SSR |

### 1.2 v3 分支现状

| 模块 | 状态 | 说明 |
| ---- | ---- | ---- |
| Button | ✅ 已完成 | Composition API + TypeScript |
| Icon | ✅ 已完成 | Composition API + TypeScript |
| Loading | ✅ 已完成 | Composition API + TypeScript |
| 构建体系 | ✅ 已完成 | Vite 5 + TailwindCSS 4 + CSS Variables |
| 样式系统 | ✅ 已完成 | theme-chalk + CSS Variables |

### 1.3 待迁移模块

| 类别 | 数量 | 优先级 |
| ---- | ---- | ------ |
| 基础组件 | ~15 | P0 |
| 表单组件 | ~30 | P1 |
| 弹层组件 | ~15 | P1 |
| 业务组件 | ~36 | P2 |

---

## 二、迁移前置条件

### 2.1 环境要求

```bash
# Node.js 版本
Node.js >= 18.0.0
pnpm >= 8.0.0

# 确保 package.json 中 vux 版本
"vux": "^3.0.0"
```

### 2.2 迁移前检查清单

```bash
# 1. 确认当前项目依赖
cat package.json | grep -E "vue|vux|vuex|vue-router"

# 2. 备份项目（重要！）
git branch backup-v2

# 3. 确认构建能正常运行
npm run build  # 或 yarn build

# 4. 运行测试（如有）
npm run test
```

### 2.3 依赖替换对照表

| v2 依赖 | v3 依赖 | 变更说明 |
| ------- | ------- | -------- |
| `vue` | `vue@^3.4` | 升级 |
| `vuex` | `pinia` | 替换（提供兼容层） |
| `vue-router` | `vue-router@^4.3` | 升级 |
| `vux-loader` | **移除** | 不再需要 |
| `less` | `sass` / `css` | 样式处理 |
| `@vux/vux-loader` | **移除** | 使用 unplugin-vue-components |

---

## 三、依赖迁移步骤

### 3.1 package.json 更新

```json
{
  "dependencies": {
-   "vue": "^2.5.16",
-   "vuex": "^2.3.1",
-   "vue-router": "^3.0.0",
+   "vue": "^3.4.21",
+   "pinia": "^2.1.7",
+   "vue-router": "^4.3.0"
  },
  "devDependencies": {
-   "vux-loader": "^1.2.0",
+   "unplugin-vue-components": "^0.26.0"
  }
}
```

### 3.2 迁移命令

```bash
# 1. 卸载旧依赖
npm uninstall vue vuex vue-router vux-loader

# 2. 安装新依赖
npm install vue@^3.4.21 pinia vue-router@^4.3.0

# 3. 安装构建工具
npm install -D unplugin-vue-components vite
```

### 3.3 Vite 配置迁移

**v2: build/webpack.conf.js**
```javascript
module.exports = {
  loaders: {
    vue: 'vux-loader'
  }
}
```

**v3: vite.config.ts**
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VuxResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VuxResolver()]
    })
  ]
})
```

### 3.4 main.js 入口迁移

**v2: src/main.js**
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vux from 'vux'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Vux) // 注册所有组件
```

**v3: src/main.ts**
```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vux from 'vux'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(Vux) // 保持相同的 API
```

---

## 四、组件迁移

### 4.1 组件迁移对照表

| 组件类型 | v2 组件名 | v3 组件名 | 变更说明 |
| -------- | --------- | --------- | -------- |
| Button | `XButton` / `Button` | `Button` | 统一为 Button |
| Cell | `Cell` / `CellBox` / `CellFormPreview` | `Cell` / `CellBox` / `CellFormPreview` | API 不变 |
| Input | `XInput` / `XTextarea` / `XNumber` | `XInput` / `XTextarea` | API 不变 |
| Picker | `Picker` / `PopupPicker` | `Picker` | API 不变 |
| Dialog | `XDialog` / `Alert` / `Confirm` | `Dialog` | API 不变 |

### 4.2 组件迁移示例

#### 4.2.1 Options API → Composition API

**v2: Button.vue**
```vue
<template>
  <button class="vux-button" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'XButton',
  props: {
    type: String,
    disabled: Boolean
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>
```

**v3: Button.vue**
```vue
<template>
  <button
    class="vux-button"
    :class="[`vux-button--${type}`]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  type?: 'primary' | 'default' | 'warn'
  disabled?: boolean
}>()

const emit = defineEmits<{
  click: [e: MouseEvent]
}>()

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}
</script>
```

#### 4.2.2 $children / $parent 替换

**v2:**
```javascript
this.$children[0].someMethod()
this.$parent.$emit('update')
```

**v3:** 使用 `defineExpose` + Template Ref
```vue
<!-- 父组件 -->
<template>
  <ChildComponent ref="childRef" />
</template>

<script setup>
import { ref } from 'vue'
const childRef = ref(null)
childRef.value?.someMethod()
</script>

<!-- 子组件 -->
<script setup>
defineExpose({
  someMethod() { /* ... */ }
})
</script>
```

### 4.3 组件 Props 类型定义

```typescript
// src/types/components.d.ts

declare module 'vue' {
  interface GlobalComponents {
    Button: {
      props: {
        type?: 'primary' | 'default' | 'warn'
        disabled?: boolean
        size?: 'small' | 'normal' | 'large'
      }
    }
  }
}

export {}
```

---

## 五、插件系统迁移（兼容性适配层）

### 5.1 插件兼容层设计

为保证 100% API 兼容，v3 提供 `compat` 模块：

```typescript
// packages/compat/index.ts
import type { App } from 'vue'

export function installCompat(app: App) {
  // this.$toast
  app.config.globalProperties.$toast = {
    show: (msg: string) => useToast().show(msg),
    hide: () => useToast().hide()
  }

  // this.$loading
  app.config.globalProperties.$loading = {
    show: () => useLoading().show(),
    hide: () => useLoading().hide()
  }

  // this.$alert / $confirm
  app.config.globalProperties.$alert = (msg: string) => useAlert().show(msg)
  app.config.globalProperties.$confirm = (msg: string) => useConfirm().show(msg)
}
```

### 5.2 使用方式（兼容 v2）

```typescript
// main.ts
import Vux from 'vux'
import { installCompat } from 'vux/compat'

const app = createApp(App)
app.use(Vux)
installCompat(app) // 可选启用兼容层
```

### 5.3 插件迁移对照

| v2 API | v3 API (Composition) | v3 API (兼容层) |
| ------ | -------------------- | --------------- |
| `this.$toast.show('msg')` | `useToast().show('msg')` | `this.$toast.show('msg')` |
| `this.$loading.show()` | `useLoading().show()` | `this.$loading.show()` |
| `this.$alert.show('msg')` | `useAlert().show('msg')` | `this.$alert.show('msg')` |

### 5.4 弹层组件返回值

**v2:**
```javascript
const alert = this.$alert.show('message')
alert.then(() => { /* on close */ })
```

**v3 (Composition):**
```typescript
const alert = useAlert()
alert.show('message').then(() => {
  // on close
})
```

---

## 六、状态管理迁移（Vuex → Pinia）

### 6.1 迁移对照表

| Vuex 概念 | Pinia 等价 | 说明 |
| --------- | ---------- | ---- |
| `new Vuex.Store()` | `defineStore()` | Store 定义 |
| `state` | `state()` (setup) 或 `ref()` | 状态 |
| `getters` | `computed()` | 计算属性 |
| `mutations` | 不再需要 | 直接在 action 中修改 |
| `actions` | `function()` | 异步操作 |
| `modules` | `defineStore()` 多 store | 模块化 |

### 6.2 Store 迁移示例

**v2: store/modules/user.js**
```javascript
export default {
  namespaced: true,
  state: {
    name: '',
    token: ''
  },
  getters: {
    isLoggedIn: state => !!state.token
  },
  mutations: {
    SET_NAME(state, name) {
      state.name = name
    },
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    async login({ commit }, credentials) {
      const token = await api.login(credentials)
      commit('SET_TOKEN', token)
    }
  }
}
```

**v3: stores/user.ts**
```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const name = ref('')
  const token = ref('')

  // Getters
  const isLoggedIn = computed(() => !!token.value)

  // Actions
  async function login(credentials: { username: string; password: string }) {
    const response = await api.login(credentials)
    token.value = response.token
    name.value = response.name
  }

  return { name, token, isLoggedIn, login }
})
```

### 6.3 组件中使用

**v2:**
```javascript
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('user', ['name'])
  },
  methods: {
    ...mapActions('user', ['login'])
  }
}
```

**v3:**
```typescript
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { name } = storeToRefs(userStore)
const { login } = userStore
```

### 6.4 Vuex 兼容层（可选）

如需保持 `this.$store` 调用方式：

```typescript
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()

// 兼容 vuex-persistedstate
pinia.use(createPersistedState({ ... }))

export { pinia }
```

---

## 七、路由迁移（Vue Router 3 → 4）

### 7.1 路由配置迁移

**v2: router/index.js**
```javascript
const routes = [
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'detail', component: Detail }
    ]
  }
]

export default new VueRouter({
  routes,
  mode: 'hash',
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
```

**v3: router/index.ts**
```typescript
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'detail', component: Detail }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0 }
  }
})

export default router
```

### 7.2 路由守卫迁移

**v2:**
```javascript
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    next('/login')
  } else {
    next()
  }
})
```

**v3:**
```typescript
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth) {
    return '/login'
  }
  return true
})
```

### 7.3 路由类型定义

```typescript
// src/types/router.d.ts

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    title?: string
  }
}

export {}
```

---

## 八、样式迁移

### 8.1 Less → CSS Variables

**v2: variable.less**
```less
@theme-color: #04BE02;
@button-warn-bg-color: #EF4F4F;
```

**v3: variables.css**
```css
:root {
  --vux-theme-color: #04BE02;
  --vux-button-warn-bg-color: #EF4F4F;
}
```

### 8.2 样式使用方式

**v2:**
```vue
<style lang="less">
@import '~vux/src/styles/var.less';
.button {
  background: @theme-color;
}
</style>
```

**v3:**
```vue
<script setup lang="ts">
// 无需 import CSS Variables
</script>

<style scoped>
.button {
  background: var(--vux-theme-color);
}
</style>
```

### 8.3 主题切换

```typescript
// 暗色主题
document.documentElement.classList.add('dark')

// 或者动态切换
const setTheme = (theme: 'light' | 'dark') => {
  document.documentElement.setAttribute('data-theme', theme)
}
```

---

## 九、过滤器迁移（Vue 3 废弃）

### 9.1 过滤器废弃说明

Vue 3 废弃了过滤器语法：`{{ value | filterName }}`

### 9.2 迁移方案

**v2:**
```javascript
// main.js
Vue.filter('currency', (value) => {
  return '$' + value.toFixed(2)
})

// Template
{{ price | currency }}
```

**v3: 组合式函数方式**
```typescript
// composables/useFilters.ts
export function useCurrency() {
  const currency = (value: number) => {
    return '$' + value.toFixed(2)
  }
  return { currency }
}
```

**v3: Template 使用**
```vue
<template>
  {{ currency(price) }}
</template>

<script setup>
import { useCurrency } from '@/composables/useFilters'
const { currency } = useCurrency()
</script>
```

### 9.3 全局过滤器兼容（可选）

```typescript
// 如果需要保持 {{ value | filter }} 语法
app.config.globalProperties.$filters = {
  currency: (value: number) => '$' + value.toFixed(2)
}

// Template
{{ $filters.currency(price) }}
```

---

## 十、SSR 支持

### 10.1 Nuxt 3 集成

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  css: ['vux/theme-chalk'],
  vite: {
    css: {
      preprocessorOptions: {
        css: {
          additionalData: '@import "vux/variables.css";'
        }
      }
    }
  }
})
```

### 10.2 Vite SSR 集成

```typescript
// vite.config.ts
export default defineConfig({
  ssr: {
    noExternal: ['vux']
  }
})
```

### 10.3 SSR 注意事项

1. **避免浏览器 API**
```typescript
// ❌ SSR 时会出错
window.addEventListener('scroll', handleScroll)

// ✅ 使用 useWindowSize composable
import { useWindowSize } from 'vux'
const { width, height } = useWindowSize()
```

2. **使用 `onMounted` / `onServerPrefetch`**
```typescript
import { onMounted, onServerPrefetch } from 'vue'

onServerPrefetch(async () => {
  // SSR 时执行
  await fetchData()
})

onMounted(() => {
  // 客户端执行
  initScrollListener()
})
```

---

## 十一、常见问题与解决方案

### Q1: vux-loader 移除后组件自动导入失效

**解决**: 使用 `unplugin-vue-components`

```typescript
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { VuxResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    Components({
      resolvers: [VuxResolver()]
    })
  ]
}
```

### Q2: `this.$vux` 等全局对象失效

**解决**: 使用 composables

```typescript
// v3
import { useVux } from 'vux/composables'
const { $vux } = useVux()
```

### Q3: `slot="xxx"` 语法变更

**v2**: `<template slot="header">`
**v3**: `<template #header>`

### Q4: 事件绑定变更

**v2**: `@click.native`
**v3**: `@click`（组件根元素的事件）

### Q5: `sync` 修饰符废弃

**v2**: `:value.sync="data"`
**v3**: `v-model:value="data"`

### Q6: `$set` / `$delete` 移除

**v2**: `this.$set(this.data, 'key', 'value')`
**v3**: 直接修改（Vue 3 是响应式的）

```typescript
data.value = 'new value' // ref
// 或
state.name = 'new name' // reactive
```

---

## 十二、迁移检查清单

### 阶段 1: 依赖迁移

- [ ] 更新 package.json 依赖
- [ ] 移除 vux-loader
- [ ] 配置 unplugin-vue-components
- [ ] 安装新依赖并验证 `npm run dev`

### 阶段 2: 入口文件迁移

- [ ] 修改 main.js → main.ts
- [ ] 配置 Pinia
- [ ] 配置 Vue Router 4
- [ ] 安装兼容层（如需要）

### 阶段 3: 组件迁移

- [ ] P0 组件：Button、Icon、Loading、Cell
- [ ] P1 组件：Dialog、Popup、Toast、Input、Picker
- [ ] P2 组件：其余组件

### 阶段 4: 状态管理迁移

- [ ] 创建 Pinia stores
- [ ] 替换 this.$store 调用
- [ ] 迁移 Vuex modules

### 阶段 5: 样式迁移

- [ ] 替换 Less 变量为 CSS Variables
- [ ] 验证组件样式正常
- [ ] 验证主题切换（如有）

### 阶段 6: 路由迁移

- [ ] 更新路由配置
- [ ] 更新路由守卫
- [ ] 添加类型定义

### 阶段 7: 测试验证

- [ ] 类型检查通过 `npm run type-check`
- [ ] 单元测试通过 `npm run test`
- [ ] E2E 测试通过（如有）
- [ ] 视觉回归测试

---

## 十三、自动化迁移工具（规划中）

| 工具 | 用途 | 状态 |
| ---- | ---- | ---- |
| `vux-migrate-cli` | 自动迁移工具 | 规划中 |
| `vux-compat` | 兼容层 npm 包 | 规划中 |
| `vux-codemod` | jscodeshift 转换规则 | 规划中 |

---

## 十四、相关文档

- [重构方案](./plan.md) - 技术架构设计
- [组件开发指南](./contributing.md) - 如何开发新组件
- [API 文档](../packages/) - 组件 API 文档
