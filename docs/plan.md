# VUX Vue2 → Vue3 重构方案

> 文档版本：v1.1
> 创建日期：2026-04-09
> 当前分支：v3
> 状态：草稿
> 最后更新：2026-04-09（确认迁移决策）

---

## 一、项目背景

- **当前项目**：Vue2 组件库 - vux
- **目标**：升级为 Vue3 + Vite + 现代工程体系
- **要求**：渐进式重构、可发布、可回滚、保证稳定性

### 1.1 v2 分支现状概览

| 维度     | 现状                        |
| -------- | --------------------------- |
| 组件数量 | 96 个                       |
| Vue 版本 | Vue 2.5.16                  |
| 构建工具 | Webpack 3 + vux-loader      |
| 语言     | JavaScript（无 TypeScript） |
| 样式     | Less（基于 WeUI）           |
| 测试     | PhantomJS（已废弃）         |
| 状态管理 | Vuex 2.3.1                  |
| 包管理   | yarn                        |

---

## 二、当前架构问题分析

### 2.1 组件设计问题

| 问题             | 描述                                             | 严重程度 |
| ---------------- | ------------------------------------------------ | -------- |
| 组件数量庞大     | 96 个组件，涵盖表单、布局、弹层、数据展示等      | 高       |
| 组件代码质量参差 | 部分组件使用 Options API，风格不统一             | 中       |
| 缺少类型定义     | 全局无 TypeScript，Props 无完整类型定义          | 高       |
| 组件文档不完善   | metas.yml 定义不统一，部分组件缺少文档           | 中       |
| 组件划分不合理   | XButton 和 Button 两个 Button 组件存在，功能重叠 | 中       |

### 2.2 状态管理问题

| 问题          | 描述                                        | 严重程度 |
| ------------- | ------------------------------------------- | -------- |
| Vuex 耦合度高 | 大量组件直接依赖 Vuex store（如 i18n、vux） | 高       |
| 全局状态滥用  | 本地组件状态被放到 Vuex 中管理              | 中       |
| Vuex 版本老旧 | Vuex 2.3.1，缺少模块化组织                  | 中       |

### 2.3 构建方式问题

| 问题               | 描述                                                | 严重程度 |
| ------------------ | --------------------------------------------------- | -------- |
| Webpack 3 过于老旧 | 无法利用现代构建技术（tree-shaking、code-spliting） | 高       |
| vux-loader 强依赖  | 组件自动导入、样式处理强耦合 vux-loader             | 高       |
| 无现代打包格式     | 缺少 ESM、UMD、CJS 多格式支持                       | 中       |
| 构建速度慢         | Webpack 3 + 大量 Less 文件                          | 中       |

### 2.4 样式系统问题

| 问题               | 描述                                    | 严重程度 |
| ------------------ | --------------------------------------- | -------- |
| Less 样式陈旧      | 基于 WeUI，variable.less 有 600+ 行变量 | 高       |
| 样式散落各处       | 组件内引用 + 全局引入混合               | 中       |
| 缺少 CSS Variables | 无法支持主题切换                        | 高       |
| 样式复用性差       | 大量硬编码颜色值                        | 中       |

### 2.5 依赖管理问题

| 问题                  | 描述                               | 严重程度 |
| --------------------- | ---------------------------------- | -------- |
| 依赖版本老旧          | Vue 2.5.16（2018年），存在安全风险 | 高       |
| 依赖冗余              | 大量未使用或重复的依赖             | 中       |
| peerDependencies 缺失 | 未声明 Vue 版本要求                | 中       |

### 2.6 测试体系问题

| 问题           | 描述                              | 严重程度 |
| -------------- | --------------------------------- | -------- |
| 测试覆盖率极低 | test/unit/specs 只有 2 个测试文件 | 高       |
| 使用 PhantomJS | 已废弃的浏览器测试环境            | 高       |
| 无 E2E 测试    | 缺少 Playwright/Cypress 等        | 高       |

---

## 三、Vue2 → Vue3 升级关键阻碍点

### 阻碍等级：高 🔴

| 阻碍项                | 具体问题                                | 解决方案难度 |
| --------------------- | --------------------------------------- | ------------ |
| **vux-loader 依赖**   | vux-loader 不支持 Vue3，必须完全移除    | 高           |
| **Options API 组件**  | 96 个组件需逐个迁移到 Composition API   | 高           |
| **Vuex 4 差异**       | Vuex 4 API 变化大，需重写状态管理       | 中           |
| **Vue Router 4 差异** | 路由配置方式变化                        | 中           |
| **插件系统不兼容**    | Toast、Alert、Loading 等插件机制不兼容  | 高           |
| **SSR 方案**          | 原方案基于 Vue SSR，需重新设计          | 中           |
| **过滤器废弃**        | Vue 3 废弃过滤器，需改写为函数          | 低           |
| **$children 移除**    | 大量使用 $children/$parent 的代码需重写 | 中           |

---

## 四、迁移模块分类

### 可直接迁移 (15%)

| 模块          | 说明                                    |
| ------------- | --------------------------------------- |
| Less 变量文件 | variable.less 可转换为 CSS Variables    |
| 部分工具函数  | date/format.js、cookie、base64 等纯函数 |
| 部分指令      | transfer-dom 等无作用域绑定             |

### 需要重构 (55%)

| 模块       | 说明                               |
| ---------- | ---------------------------------- |
| 96 个组件  | 全部需要重写为 Composition API     |
| Vuex store | 需要重构为 Pinia 或 Vuex 4         |
| Vue Router | 需要适配 Vue Router 4              |
| 插件系统   | Toast、Alert、Loading、Datetime 等 |
| 组件测试   | 需重新编写 Vitest 测试             |

### 需要重写 (30%)

| 模块     | 说明                                 |
| -------- | ------------------------------------ |
| 构建系统 | Webpack → Vite                       |
| 样式系统 | Less → TailwindCSS 4 + CSS Variables |
| 文档系统 | 需重新搭建 VitePress/Storybook       |
| CLI 工具 | quickCreateComponent.js 等           |

---

## 五、目标架构设计

### 5.1 目录结构

```
vux/
├── src/
│   ├── components/              # 组件源码
│   │   ├── actionsheet/
│   │   ├── alert/
│   │   ├── badge/
│   │   ├── button/              # 统一 Button 组件
│   │   ├── cell/
│   │   ├── dialog/
│   │   ├── icon/
│   │   ├── loading/
│   │   ├── popup/
│   │   ├── toast/
│   │   └── ... (其他组件)
│   │
│   ├── composables/             # 组合式函数
│   │   ├── useToast.ts
│   │   ├── useDialog.ts
│   │   ├── useLoading.ts
│   │   └── ...
│   │
│   ├── hooks/                   # 业务 hooks
│   │
│   ├── utils/                   # 工具函数
│   │   ├── date/
│   │   ├── string/
│   │   └── ...
│   │
│   ├── styles/                  # 样式系统
│   │   ├── base/                # CSS Variables
│   │   ├── components/          # 组件样式
│   │   └── index.scss
│   │
│   ├── types/                   # 类型定义
│   │   └── global.d.ts
│   │
│   └── index.ts                 # 入口文件
│
├── packages/                    # 独立发布包
│   ├── core/                    # 核心组件
│   └── theme-chalk/             # 样式包
│
├── build/                      # 构建脚本（重构）
├── docs/                        # 文档
├── website/                     # 文档站
├── test/                        # 测试
│   ├── unit/
│   └── e2e/
│
├── vite.config.ts              # Vite 配置
├── vitest.config.ts            # Vitest 配置
└── tsconfig.json
```

### 5.2 技术选型

| 维度     | 选择                          | 理由                                 |
| -------- | ----------------------------- | ------------------------------------ |
| Vue 版本 | Vue 3.4+                      | 组合式 API、Suspense、Teleport       |
| 构建工具 | Vite 5.x                      | 极速 HMR、更好的 tree-shaking        |
| 语言     | TypeScript 5.x                | 类型安全、更好的 IDE 支持            |
| 样式方案 | TailwindCSS 4 + CSS Variables | 原子化 CSS、主题切换                 |
| 状态管理 | Pinia                         | Vue 官方推荐、更好的 TypeScript 支持 |
| 测试框架 | Vitest                        | Vue 官方推荐，与 Vite 集成           |
| E2E 测试 | Playwright                    | 跨浏览器、现代化                     |
| 组件测试 | @vue/test-utils + Vitest      | Vue3 官方                            |
| 文档方案 | Storybook 8                   | 组件驱动开发、更好的交互演示         |
| 包管理   | pnpm                          | 更快、更节省空间                     |

---

## 六、迁移策略

### 策略选择：**渐进式迁移 + 双版本共存**

```
v2 (Vue2) ──────────────────→ v3 (Vue3)
  │                              │
  │   长期维护                    │  新功能开发
  │                              │
  └──────────────────────────────┘
              ↓
         提供迁移路径
```

### 具体方案

1. **保持 v2 分支稳定维护**
   - 继续修复 bug、安全更新
   - 不引入新功能

2. **新建 v3 分支开发**
   - 基于 Vue 3 + Vite + TypeScript
   - 重新设计组件 API
   - 提供迁移指南

3. **分阶段迁移组件**：
   - Phase 1: 基础组件（Button、Icon、Loading、Cell）
   - Phase 2: 业务组件（Form、Picker、Datetime）
   - Phase 3: 复杂组件（Swipeout、Scroller、Calendar）

4. **样式系统分阶段改造**：
   - Phase 1: Less → CSS Variables（保留 Less）
   - Phase 2: CSS Variables → TailwindCSS 4

5. **包管理策略**：
   - `@vux/core`: 核心组件
   - `@vux/theme-chalk`: 样式包
   - `@vux/preset`: Vue CLI/Vite 预设

---

## 七、任务拆解

```json
[
  {
    "task_name": "T1_构建系统搭建",
    "scope": "根目录",
    "description": "搭建 Vite + Vitest + TypeScript 构建系统，移除 Webpack 和 vux-loader",
    "priority": "high",
    "can_parallel": false,
    "depends_on": []
  },
  {
    "task_name": "T2_样式系统初始化",
    "scope": "src/styles",
    "description": "建立 CSS Variables 变量体系，创建 TailwindCSS 4 配置，定义基础样式",
    "priority": "high",
    "can_parallel": false,
    "depends_on": ["T1"]
  },
  {
    "task_name": "T3_组件类型定义",
    "scope": "src/types",
    "description": "为所有组件编写 TypeScript 类型定义，建立 Props interface",
    "priority": "high",
    "can_parallel": true,
    "depends_on": ["T1"]
  },
  {
    "task_name": "T4_基础组件_Button",
    "scope": "src/components/button",
    "description": "迁移 Button 组件到 Vue3 Composition API，支持 TypeScript",
    "priority": "high",
    "can_parallel": true,
    "depends_on": ["T2"]
  },
  {
    "task_name": "T5_基础组件_Icon",
    "scope": "src/components/icon",
    "description": "迁移 Icon 组件，支持更多 icon 类型",
    "priority": "high",
    "can_parallel": true,
    "depends_on": ["T2"]
  },
  {
    "task_name": "T6_基础组件_Loading",
    "scope": "src/components/loading",
    "description": "迁移 Loading 组件到 Composition API",
    "priority": "high",
    "can_parallel": true,
    "depends_on": ["T2"]
  },
  {
    "task_name": "T7_基础组件_Cell",
    "scope": "src/components/cell",
    "description": "迁移 Cell、CellBox、CellFormPreview 组件组",
    "priority": "high",
    "can_parallel": true,
    "depends_on": ["T2"]
  },
  {
    "task_name": "T8_表单组件_Input",
    "scope": "src/components/x-input",
    "description": "迁移 XInput、XTextarea、XNumber 等输入组件",
    "priority": "medium",
    "can_parallel": true,
    "depends_on": ["T4"]
  },
  {
    "task_name": "T9_表单组件_Picker",
    "scope": "src/components/picker",
    "description": "迁移 Picker、PopupPicker、DateTime 等选择组件",
    "priority": "medium",
    "can_parallel": true,
    "depends_on": ["T4"]
  },
  {
    "task_name": "T10_表单组件_Switch",
    "scope": "src/components/switch",
    "description": "迁移 XSwitch、Checker、Radio、Checkbox 等",
    "priority": "medium",
    "can_parallel": true,
    "depends_on": ["T4"]
  },
  {
    "task_name": "T11_弹层组件_Dialog",
    "scope": "src/components/dialog",
    "description": "迁移 XDialog、Alert、Confirm 弹层组件",
    "priority": "high",
    "can_parallel": true,
    "depends_on": ["T2"]
  },
  {
    "task_name": "T12_弹层组件_Popup",
    "scope": "src/components/popup",
    "description": "迁移 Popup、PopupHeader、Popover 等",
    "priority": "medium",
    "can_parallel": true,
    "depends_on": ["T11"]
  },
  {
    "task_name": "T13_Toast_Plugin",
    "scope": "src/composables",
    "description": "实现 Toast 组合式函数，替代原有 Vue 插件",
    "priority": "high",
    "can_parallel": true,
    "depends_on": ["T2"]
  },
  {
    "task_name": "T14_Loading_Plugin",
    "scope": "src/composables",
    "description": "实现 Loading 组合式函数",
    "priority": "high",
    "can_parallel": true,
    "depends_on": ["T2"]
  },
  {
    "task_name": "T15_状态管理_Pinia",
    "scope": "src/store",
    "description": "搭建 Pinia store，替代 Vuex",
    "priority": "medium",
    "can_parallel": true,
    "depends_on": ["T1"]
  },
  {
    "task_name": "T16_路由_VueRouter4",
    "scope": "src/router",
    "description": "迁移路由配置到 Vue Router 4",
    "priority": "medium",
    "can_parallel": true,
    "depends_on": ["T1"]
  },
  {
    "task_name": "T17_工具函数_TypeScript化",
    "scope": "src/utils",
    "description": "将工具函数迁移到 TypeScript，完善类型定义",
    "priority": "low",
    "can_parallel": true,
    "depends_on": ["T1"]
  },
  {
    "task_name": "T18_样式迁移_Phase2",
    "scope": "src/styles",
    "description": "Less → TailwindCSS 4 转换",
    "priority": "low",
    "can_parallel": true,
    "depends_on": ["T2", "T4", "T5", "T6", "T7"]
  },
  {
    "task_name": "T19_测试体系完善",
    "scope": "test/",
    "description": "完善 Vitest 单元测试，搭建 Playwright E2E 测试",
    "priority": "medium",
    "can_parallel": true,
    "depends_on": ["T4", "T5", "T6"]
  },
  {
    "task_name": "T20_文档系统",
    "scope": "docs/, website/",
    "description": "搭建 Storybook 文档站，包含组件演示、API 文档",
    "priority": "low",
    "can_parallel": true,
    "depends_on": ["T4", "T5", "T6"]
  },
  {
    "task_name": "T21_组件库入口完善",
    "scope": "src/index.ts",
    "description": "完善多格式导出、版本管理、install 方法",
    "priority": "high",
    "can_parallel": false,
    "depends_on": ["T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"]
  }
]
```

---

## 八、Subagent 分配方案

### Agent 1: build-system-agent

| 项目         | 内容                                                         |
| ------------ | ------------------------------------------------------------ |
| **职责**     | 搭建 Vite 构建系统                                           |
| **负责范围** | 根目录配置文件                                               |
| **输入**     | 当前 Webpack 配置、package.json                              |
| **输出**     | vite.config.ts、vitest.config.ts、tsconfig.json、package.json 更新建议 |
| **约束**     | 移除 vux-loader；保留按需加载能力（使用 unplugin-vue-components）；支持多格式构建 |

---

### Agent 2: style-system-agent

| 项目         | 内容                                                         |
| ------------ | ------------------------------------------------------------ |
| **职责**     | 建立 CSS Variables + TailwindCSS 样式系统                    |
| **负责范围** | src/styles                                                   |
| **输入**     | variable.less（600+ 变量）、weui.less 结构                   |
| **输出**     | CSS Variables 变量文件、TailwindCSS 4 配置、组件样式迁移方案 |
| **约束**     | 变量命名保持兼容（如 @theme-color → --vux-theme-color）；保留 fallback 机制；输出 Less → CSS Variables 映射文档 |

---

### Agent 3: components-phase1-agent

| 项目         | 内容                                                         |
| ------------ | ------------------------------------------------------------ |
| **职责**     | 迁移基础组件（Button、Icon、Loading、Cell）                  |
| **负责范围** | src/components/button、icon、loading、cell                   |
| **输入**     | Vue2 组件源码、类型定义模板                                  |
| **输出**     | Vue3 Composition API 组件、TypeScript 类型定义、组件单元测试 |
| **约束**     | 保持组件 API 兼容或提供迁移方案；组件名称统一；通过 Vitest 测试 |

---

### Agent 4: components-phase2-agent

| 项目         | 内容                                                |
| ------------ | --------------------------------------------------- |
| **职责**     | 迁移表单组件（Input、Picker、Switch）               |
| **负责范围** | src/components/x-input、x-number、picker、switch 等 |
| **约束**     | 同 Agent 3                                          |

---

### Agent 5: components-phase3-agent

| 项目         | 内容                                   |
| ------------ | -------------------------------------- |
| **职责**     | 迁移弹层组件（Dialog、Popup、Toast）   |
| **负责范围** | src/components/dialog、popup、toast 等 |
| **约束**     | 同 Agent 3                             |

---

### Agent 6: composables-agent

| 项目         | 内容                                                         |
| ------------ | ------------------------------------------------------------ |
| **职责**     | 实现组合式函数替代原有插件                                   |
| **负责范围** | src/composables                                              |
| **输入**     | Vue2 插件源码（src/plugins/toast、loading、alert 等）        |
| **输出**     | useToast.ts、useLoading.ts、useAlert.ts、useDialog.ts、useDevice.ts |
| **约束**     | 函数式调用（替代 this.$toast）；支持 Promise；保留原有配置项 |

---

### Agent 7: utils-enhancement-agent

| 项目         | 内容                                              |
| ------------ | ------------------------------------------------- |
| **职责**     | 工具函数 TypeScript 化                            |
| **负责范围** | src/utils                                         |
| **输入**     | 当前工具函数（date、string、validator 等）        |
| **输出**     | TypeScript 化的工具函数、完整的类型定义、单元测试 |
| **约束**     | 保持原有 API 兼容；纯函数，无副作用               |

---

### Agent 8: storybook-agent

| 项目         | 内容                                        |
| ------------ | ------------------------------------------- |
| **职责**     | 搭建 Storybook 文档系统                     |
| **负责范围** | 根目录                                      |
| **输入**     | 已迁移的组件                                |
| **输出**     | Storybook 配置、组件 Stories 文件、文档页面 |
| **约束**     | 支持组件自动发现；包含交互测试              |

---

## 九、执行调度

### 阶段 1：基础设施（Batch 1）- 串行

```
[T1] 构建系统搭建
     ↓
[T2] 样式系统初始化 ← T1 完成后启动
```

### 阶段 2：核心组件（Batch 2）- 可并行

```
[T3] 组件类型定义  ─┐
[T4] Button 组件   ├─ 并行
[T5] Icon 组件    ─┤
[T6] Loading 组件 ─┤
[T7] Cell 组件    ─┘
```

### 阶段 3：插件与状态（Batch 3）- 可并行

```
[T13] Toast Plugin ─┐
[T14] Loading Plugin ├─ 并行
[T15] Pinia Store  ─┤
[T16] VueRouter 4  ─┘
```

### 阶段 4：表单组件（Batch 4）- 可并行

```
[T8] Input 组件   ─┐
[T9] Picker 组件 ─┼─ 并行
[T10] Switch 组件─┘
```

### 阶段 5：弹层组件（Batch 5）- 可并行

```
[T11] Dialog 组件 ─┐
[T12] Popup 组件 ─┤ 并行
```

### 阶段 6：整合（Batch 6）- 串行

```
[T21] 组件库入口完善 ← 所有组件完成后
```

### 阶段 7：增强（Batch 7）- 可并行

```
[T17] 工具函数 TS 化 ─┐
[T18] 样式迁移 Phase2 ├─ 并行
[T19] 测试体系       ─┤
[T20] Storybook      ─┘
```

---

## 十、风险控制与回滚方案

### 10.1 各阶段风险点

| 阶段    | 风险点                     | 验证方式             | 回滚方案      |
| ------- | -------------------------- | -------------------- | ------------- |
| Batch 1 | 构建配置错误导致无法启动   | `npm run dev` 成功   | git revert    |
| Batch 2 | 组件行为变化导致 demo 异常 | Storybook 视觉测试   | git revert    |
| Batch 3 | 插件调用方式变化           | 单元测试 + Storybook | Feature flag  |
| Batch 4 | 表单验证逻辑丢失           | E2E 测试             | git revert    |
| Batch 5 | 弹层动画异常               | 视觉测试             | git revert    |
| Batch 6 | 导出格式问题               | 多格式构建验证       | git revert    |
| Batch 7 | 样式不一致                 | Visual regression    | 保留 fallback |

### 10.2 验证策略

```bash
# 每次提交必须通过
npm run type-check   # TypeScript 类型检查
npm run test         # Vitest 单元测试
npm run build        # 构建验证
npm run storybook    # Storybook 视觉测试
```

### 10.3 回滚机制

1. **Git 分支策略**：
   - `v2`: Vue2 稳定版（长期维护）
   - `v3`: Vue3 开发分支（当前工作）

2. **Feature Flag**：
   - 新组件可通过 `VUX_V3_NEW` 环境变量控制

3. **样式 Fallback**：
   - 保留 Less 文件作为 fallback

---

## 十一、任务状态看板

| Task                | 状态     | 执行人 | 完成标准               |
| ------------------- | -------- | ------ | ---------------------- |
| T1 构建系统搭建     | 🔴 未开始 | -      | Vite dev server 可运行 |
| T2 样式系统初始化   | 🔴 未开始 | -      | CSS Variables 就绪     |
| T3 组件类型定义     | 🔴 未开始 | -      | 全局类型定义完成       |
| T4 Button 组件      | 🔴 未开始 | -      | Storybook 演示正常     |
| T5 Icon 组件        | 🔴 未开始 | -      | Storybook 演示正常     |
| T6 Loading 组件     | 🔴 未开始 | -      | Storybook 演示正常     |
| T7 Cell 组件        | 🔴 未开始 | -      | Storybook 演示正常     |
| T8 Input 组件       | 🔴 未开始 | -      | -                      |
| T9 Picker 组件      | 🔴 未开始 | -      | -                      |
| T10 Switch 组件     | 🔴 未开始 | -      | -                      |
| T11 Dialog 组件     | 🔴 未开始 | -      | -                      |
| T12 Popup 组件      | 🔴 未开始 | -      | -                      |
| T13 Toast Plugin    | 🔴 未开始 | -      | -                      |
| T14 Loading Plugin  | 🔴 未开始 | -      | -                      |
| T15 Pinia Store     | 🔴 未开始 | -      | -                      |
| T16 VueRouter 4     | 🔴 未开始 | -      | -                      |
| T17 工具函数 TS 化  | 🔴 未开始 | -      | -                      |
| T18 样式迁移 Phase2 | 🔴 未开始 | -      | -                      |
| T19 测试体系        | 🔴 未开始 | -      | -                      |
| T20 Storybook       | 🔴 未开始 | -      | -                      |
| T21 组件库入口      | 🔴 未开始 | -      | -                      |

---

## 十二、版本对比

| 对比项   | v2 (当前)  | v3 (已完成部分)      |
| -------- | ---------- | -------------------- |
| 组件数量 | 96 个      | 3 个                 |
| 构建工具 | Webpack 3  | Vite                 |
| 语言     | JavaScript | TypeScript           |
| 样式     | Less       | Less + TailwindCSS 4 |
| 测试     | PhantomJS  | Vitest               |
| 架构     | 单体       | 模块化               |

---

## 十三、待确认事项

> ✅ 已确认 - 以下为决策结果

1. **基于哪个分支进行重构？**
   - ✅ **v3 分支**（已有基础架构：Vue 3 + Vite + TailwindCSS 4 + CSS Variables）
   - v2 分支作为稳定版长期维护

2. **是否需要保持 100% API 兼容？**
   - ✅ **是**（必须保持 100% API 兼容）
   - 组件 Props、Events、Slots 保持完全一致
   - 插件调用方式（如 `this.$toast`）需提供兼容层
   - 用户迁移成本最低化

3. **是否需要支持 SSR？**
   - ✅ **是**（需要支持 SSR）
   - 采用 Vue 3 SSR 方案（Vite SSR / Nuxt 3）
   - 组件需支持 `serverPrefetch` / `asyncData`
   - 样式需支持 SSR 渲染（避免 hydration mismatch）

4. **目标用户群体？**
   - ✅ **现有 v2 用户优先**
   - 必须提供完整迁移方案和迁移指南
   - 新用户可从 v3 开始使用

---

## 十四、迁移方案设计（新增）

### 14.1 迁移路径

```
v2 用户项目
    │
    ▼
┌─────────────────────┐
│  迁移准备阶段         │
│  1. 安装 @vux/v3     │
│  2. 阅读迁移指南      │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│  逐模块替换           │
│  按依赖关系顺序替换    │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│  验证阶段             │
│  1. 类型检查          │
│  2. 视觉回归          │
│  3. E2E 测试         │
└─────────────────────┘
    │
    ▼
   v3 完整迁移
```

### 14.2 兼容性适配层（必须实现）

| 兼容层 | Vue2 调用方式 | Vue3 兼容实现 |
| ------ | ------------- | ------------- |
| `this.$toast` | `this.$toast.show('msg')` | `useToast()` + `app.config.globalProperties` |
| `this.$loading` | `this.$loading.show()` | `useLoading()` + `app.config.globalProperties` |
| `this.$alert` | `this.$alert.show('msg')` | `useAlert()` + `app.config.globalProperties` |
| `this.$confirm` | `this.$confirm.show('msg')` | `useConfirm()` + `app.config.globalProperties` |
| `v-model` 语法 | 原生支持 | 保持兼容，无需改动 |
| Filters | `{{ value \| filterName }}` | 提供 `useFilters` 组合式函数 |

### 14.3 迁移检查清单

- [ ] 替换 package.json 依赖（vue → vue3，vux-loader → 移除）
- [ ] 替换构建配置（webpack → vite）
- [ ] 替换 Less 为 CSS Variables / TailwindCSS
- [ ] 替换 Vuex 为 Pinia（提供兼容层 `vuex-compat`）
- [ ] 替换 Vue Router 3 → 4
- [ ] 按依赖顺序替换组件（先基础组件，后业务组件）
- [ ] 验证 SSR 渲染正常
- [ ] 视觉回归测试
- [ ] E2E 测试通过
- [ ] 编写组件迁移对照表（每个组件的变更点）

### 14.4 迁移优先级（组件分批）

| 批次 | 组件 | 优先级理由 |
| ---- | ---- | ---------- |
| P0 | Button、Icon、Cell、Loading | 基础组件，其他组件依赖 |
| P1 | Dialog、Popup、Toast、ActionSheet | 弹层组件，高频使用 |
| P2 | Input、Picker、Switch、Checkbox、Radio | 表单组件，业务核心 |
| P3 | 其他 80+ 组件 | 按需迁移 |

---

## 十五、SSR 支持方案（新增）

### 15.1 技术选型

| 方案 | 选择 | 理由 |
| ---- | ---- | ---- |
| SSR 框架 | Vite SSR / Nuxt 3 | 与 Vite 构建体系一致 |
| 水合策略 | 组件级别懒水合 | 避免样式闪烁 |

### 15.2 SSR 注意事项

1. **样式渲染**：所有样式必须使用 CSS Variables，避免 `<style>` 内联样式导致 hydration mismatch
2. **异步组件**：使用 `defineAsyncComponent` 配合 `Suspense`
3. **数据获取**：组件使用 `serverPrefetch` 钩子
4. **Hydration**：避免在 SSR 阶段执行浏览器特有 API（`window`、`document`）

---

## 十六、修改记录

| 版本 | 日期       | 修改内容                               |
| ---- | ---------- | -------------------------------------- |
| v1.0 | 2026-04-09 | 初始版本，基于 v2 分支分析             |
| v1.1 | 2026-04-09 | 确认基于 v3 分支重构，100% API 兼容，支持 SSR，设计迁移方案 |