# VUX Vue3 迁移任务清单

> 文档版本：v1.0
> 创建日期：2026-04-09
> 当前分支：v3
> 最后更新：2026-04-09

---

## 任务状态说明

- [x] DONE - 已完成
- [ ] TODO - 待开始
- [ ] DOING - 进行中
- [ ] BLOCKED - 阻塞

---

## Batch 1：基础设施（已完成）

| 任务 | 状态 | 备注 |
|------|------|------|
| Vite 5 构建系统 | [x] DONE | vite.config.ts 已配置 |
| TailwindCSS 4 集成 | [x] DONE | @tailwindcss/vite 已配置 |
| CSS Variables 主题系统 | [x] DONE | theme-chalk 已引入 |
| TypeScript 配置 | [x] DONE | tsconfig.json 已配置 |
| Vitest 测试框架 | [x] DONE | 已安装，无测试用例 |

---

## Batch 2：核心组件迁移

### 2.1 基础组件（~15 个）

| # | 组件 | 状态 | 优先级 | 备注 |
|---|------|------|--------|------|
| 1 | Icon | [x] DONE | - | v3 已完成 |
| 2 | Loading | [x] DONE | - | v3 已完成 |
| 3 | Badge | [ ] TODO | P1 | |
| 4 | Box | [ ] TODO | P1 | |
| 5 | Divider | [ ] TODO | P1 | |
| 6 | Load-more | [ ] TODO | P1 | |
| 7 | Masker | [ ] TODO | P2 | |
| 8 | Dev-tip | [ ] TODO | P3 | |
| 9 | View-box | [ ] TODO | P2 | |
| 10 | Wechat-emotion | [ ] TODO | P3 | |
| 11 | Shake | [ ] TODO | P3 | |
| 12 | Blur | [ ] TODO | P3 | |
| 13 | Spinner | [ ] TODO | P2 | |
| 14 | Agree | [ ] TODO | P2 | |
| 15 | Tip | [ ] TODO | P2 | |

### 2.2 表单组件（~35 个）

| # | 组件 | 状态 | 优先级 | 备注 |
|---|------|------|--------|------|
| 1 | Cell | [ ] TODO | P0 | |
| 2 | Cell-box | [ ] TODO | P0 | |
| 3 | Cell-form-preview | [ ] TODO | P0 | |
| 4 | X-input | [ ] TODO | P0 | |
| 5 | X-textarea | [ ] TODO | P0 | |
| 6 | X-switch | [ ] TODO | P0 | |
| 7 | X-number | [ ] TODO | P1 | |
| 8 | X-progress | [ ] TODO | P1 | |
| 9 | Radio | [ ] TODO | P0 | |
| 10 | Checker | [ ] TODO | P0 | |
| 11 | Checklist | [ ] TODO | P0 | |
| 12 | Selector | [ ] TODO | P1 | |
| 13 | Picker | [ ] TODO | P0 | |
| 14 | Datetime | [ ] TODO | P0 | |
| 15 | Datetime-range | [ ] TODO | P1 | |
| 16 | Datetime-view | [ ] TODO | P1 | |
| 17 | Popup-picker | [ ] TODO | P0 | |
| 18 | Popup-radio | [ ] TODO | P1 | |
| 19 | Range | [ ] TODO | P0 | |
| 20 | Rater | [ ] TODO | P1 | |
| 21 | Inline-x-number | [ ] TODO | P2 | |
| 22 | Inline-x-switch | [ ] TODO | P2 | |
| 23 | Search | [ ] TODO | P1 | |
| 24 | Form-preview | [ ] TODO | P1 | |
| 25 | X-form | [ ] TODO | P0 | |
| 26 | Color-picker | [ ] TODO | P2 | |
| 27 | Countup | [ ] TODO | P2 | |
| 28 | Countdown | [ ] TODO | P1 | |
| 29 | Clocker | [ ] TODO | P2 | |
| 30 | Number-roller | [ ] TODO | P2 | |
| 31 | Inline-calendar | [ ] TODO | P1 | |
| 32 | Calendar | [ ] TODO | P1 | |
| 33 | Week-calendar | [ ] TODO | P2 | |
| 34 | Uploader | [ ] TODO | P1 | |
| 35 | Qrcode | [ ] TODO | P2 | |

### 2.3 弹层组件（~15 个）

| # | 组件 | 状态 | 优先级 | 备注 |
|---|------|------|--------|------|
| 1 | Toast | [ ] TODO | P0 | |
| 2 | Alert | [ ] TODO | P0 | |
| 3 | Confirm | [ ] TODO | P0 | |
| 4 | X-dialog | [ ] TODO | P0 | |
| 5 | Actionsheet | [ ] TODO | P0 | |
| 6 | Popup | [ ] TODO | P0 | |
| 7 | Popup-header | [ ] TODO | P1 | |
| 8 | Drawer | [ ] TODO | P1 | |
| 9 | Msg | [ ] TODO | P0 | |
| 10 | Popover | [ ] TODO | P1 | |
| 11 | Previewer | [ ] TODO | P1 | |
| 12 | Swipeout | [ ] TODO | P1 | |
| 13 | Sticky | [ ] TODO | P1 | |

### 2.4 布局组件（~10 个）

| # | 组件 | 状态 | 优先级 | 备注 |
|---|------|------|--------|------|
| 1 | Flexbox | [ ] TODO | P1 | |
| 2 | Grid | [ ] TODO | P1 | |
| 3 | Group | [ ] TODO | P1 | |
| 4 | Group-title | [ ] TODO | P2 | |
| 5 | Tab | [ ] TODO | P0 | |
| 6 | Tabbar | [ ] TODO | P0 | |
| 7 | Button-tab | [ ] TODO | P1 | |
| 8 | Step | [ ] TODO | P1 | |
| 9 | Timeline | [ ] TODO | P2 | |
| 10 | Flow | [ ] TODO | P2 | |

### 2.5 业务组件（~20 个）

| # | 组件 | 状态 | 优先级 | 备注 |
|---|------|------|--------|------|
| 1 | X-button | [ ] TODO | P0 | |
| 2 | X-circle | [ ] TODO | P1 | |
| 3 | X-header | [ ] TODO | P0 | |
| 4 | X-img | [ ] TODO | P0 | |
| 5 | Card | [ ] TODO | P1 | |
| 6 | Panel | [ ] TODO | P1 | |
| 7 | Marquee | [ ] TODO | P2 | |
| 8 | Swiper | [ ] TODO | P0 | |
| 9 | Scroller | [ ] TODO | P1 | |
| 10 | X-address | [ ] TODO | P1 | |
| 11 | Fullpage | [ ] TODO | P2 | |
| 12 | Inline-loading | [ ] TODO | P2 | |
| 13 | Inline-desc | [ ] TODO | P3 | |
| 14 | Check-icon | [ ] TODO | P2 | |
| 15 | Video | [ ] TODO | P2 | |
| 16 | v-chart | [ ] TODO | P2 | 图表组件 |

---

## Batch 3：增强任务

| 任务 | 状态 | 优先级 | 依赖 |
|------|------|--------|------|
| TypeScript 类型完善 | [ ] TODO | high | Batch 2 基础组件 |
| 测试体系建立 | [ ] TODO | high | Batch 2 基础组件 |
| 样式系统统一 | [ ] TODO | medium | Batch 2 基础组件 |
| API 文档完善 | [ ] TODO | medium | Batch 2 基础组件 |

---

## Batch 4：收尾任务

| 任务 | 状态 | 优先级 | 可并行 |
|------|------|--------|--------|
| 构建脚本审查 | [ ] TODO | medium | true |
| 官网迁移 | [ ] TODO | low | true |
| Vetur 插件支持 | [ ] TODO | medium | true |
| npm 发布配置 | [ ] TODO | medium | true |

---

## 进度统计

| 类别 | 总数 | 已完成 | 进行中 | 待开始 |
|------|------|--------|--------|--------|
| 基础设施 | 5 | 5 | 0 | 0 |
| 基础组件 | 15 | 2 | 0 | 13 |
| 表单组件 | 35 | 0 | 0 | 35 |
| 弹层组件 | 13 | 0 | 0 | 13 |
| 布局组件 | 10 | 0 | 0 | 10 |
| 业务组件 | 16 | 0 | 0 | 16 |
| 增强任务 | 4 | 0 | 0 | 4 |
| 收尾任务 | 4 | 0 | 0 | 4 |
| **总计** | **102** | **7** | **0** | **95** |

---

## 迁移优先级参考

| 优先级 | 说明 | 组件范围 |
|--------|------|----------|
| P0 | 核心组件，必须优先迁移 | Cell, X-input, Radio, Checker, Picker, Datetime, Toast, Alert, X-dialog, Tab, Tabbar, X-button, X-header, X-img, Swiper |
| P1 | 重要组件，尽快迁移 | Badge, Box, Divider, Load-more, Selector, Popup-picker, Range, Search, Countdown, Uploader, Popup, Msg, Flexbox, Grid, Group, Button-tab, Step, Card, Panel, Scroller |
| P2 | 一般组件，后续迁移 | Masker, View-box, Spinner, Agree, Tip, Datetime-range, Datetime-view, Popup-radio, Popup-header, Rater, Inline-x-number, Inline-x-switch, Form-preview, Color-picker, Countup, Clocker, Number-roller, Inline-calendar, Calendar, Week-calendar, Qrcode, Drawer, Popover, Previewer, Swipeout, Sticky, Group-title, Timeline, Flow, Marquee, X-circle, X-address, Fullpage, Inline-loading, Check-icon |
| P3 | 低优先级，可选迁移 | Dev-tip, Wechat-emotion, Shake, Blur, Inline-desc, Video, v-chart |
