const list = {
  Intro: {
    'zh-CN': '介绍'
  },
  Install: {
    'zh-CN': '安装'
  },
  Examples: {
    'zh-CN': '栗子' // 故意的，不需要改
  },
  Changelog: {
    'zh-CN': '版本更新'
  },
  faq: {
    'zh-CN': '常见问题'
  },
  title: {
    'en': 'VUX - Vue.js Mobile UI Component Framework',
    'zh-CN': 'VUX - 基于 WeUI 和 Vue 的移动端组件库'
  },
  Directives: {
    'zh-CN': '指令 Directives'
  },
  Guide: {
    'zh-CN': '教程'
  },
  Css: {
    'zh-CN': '样式 CSS'
  },
  '1px': {
    'zh-CN': '1px 解决方案'
  },
  'css-close-icon': {
    'zh-CN': 'css 关闭图标'
  },
  Components: {
    'zh-CN': '组件'
  },
  Component: {
    'zh-CN': '组件'
  },
  'donot need import': {
    'en': 'You don\'t need to import this component.',
    'zh-CN': '该组件可以直接使用，不需要引入。'
  },
  Releases: {
    'zh-CN': '发布日志'
  },
  Toolkit: {
    'zh-CN': '工具函数 Tools'
  },
  Lab: {
    'zh-CN': '实验室'
  },
  Donate: {
    'zh-CN': '捐赠'
  },
  'return FAQ': {
    'zh-CN': '返回 【常见问题】'
  },
  'Realtime developers': {
    'zh-CN': '实时 VUX 开发者'
  },
  'Developers in 24h': {
    'zh-CN': '24小时内 VUX 开发者'
  },
  'globally register': {
    'en': 'you can also register globally',
    'zh-CN': '在入口文件全局引入'
  },
  'default slot': {
    en: 'default',
    'zh-CN': '默认插槽'
  },
  'required version': {
    'zh-CN': '版本要求'
  },
  'qr': {
    'en': 'view demos on mobile',
    'zh-CN': '二维码'
  },
  'component source code': {
    'zh-CN': '组件源码'
  },
  'demo url': {
    'zh-CN': 'demo 原始链接'
  },
  'edit document': {
    'zh-CN': '编辑文档'
  },
  'demo source code': {
    'zh-CN': 'demo 源码'
  },
  'example': {
    'zh-CN': '使用例子'
  },
  'Props': {
    'zh-CN': '属性'
  },
  'Events': {
    'zh-CN': '事件'
  },
  'Slots': {
    'zh-CN': '插槽'
  },
  'Functions': {
    'zh-CN': '方法'
  },
  'Prop': {
    'zh-CN': '属性'
  },
  'Event': {
    'zh-CN': '事件'
  },
  'Slot': {
    'zh-CN': '插槽'
  },
  'Function': {
    'zh-CN': '方法'
  },
  'Related issues': {
    'zh-CN': '相关 issue'
  },
  'Contributors': {
    'zh-CN': '贡献者'
  },
  'Referrences': {
    'zh-CN': '参考资料'
  },
  'Tips': {
    'zh-CN': '重要提示及已知问题'
  },
  'component tutorial': {
    'zh-CN': '组件使用教程'
  },
  'name': {
    'zh-CN': '名字'
  },
  'type': {
    'zh-CN': '类型'
  },
  'params': {
    'zh-CN': '参数'
  },
  'required vesion': {
    'zh-CN': '版本要求'
  },
  'description': {
    'zh-CN': '说明'
  },
  'default value': {
    en: 'default',
    'zh-CN': '默认值'
  },
  'Total commits quantity:': {
    'zh-CN': '该组件(包含文档)迭代次数'
  },
  'Total contributors quantity:': {
    'zh-CN': '贡献人数'
  },
  'contribute': {
    'zh-CN': '贡献次数'
  },
  'date format': {
    en: 'date-format',
    'zh-CN': '日期格式化'
  },
  'number 格式化工具': {
    en: 'number'
  },
  'url 参数解析': {
    en: 'url querystring'
  },
  'string 处理工具': {
    en: 'string'
  },
  'Search documents': {
    'zh-CN': '搜索文档'
  },
  'No search results': {
    'zh-CN': 'Sorry，无搜索结果'
  },
  'click to copy': {
    'zh-CN': '点击复制'
  },
  'copy done!': {
    'zh-CN': '复制成功'
  },
  'copy fail!': {
    'zh-CN': '复制失败'
  },
  'Variables': {
    'zh-CN': '样式变量'
  },
  'is inherited': {
    'zh-CN': '是否继承自另一变量'
  },
  'inherited name': {
    'zh-CN': '继承自变量'
  },
  'Online developers': {
    'zh-CN': '在线 VUX 开发者'
  },
  'priceCurrency': {
    en: 'USD',
    'zh-CN': 'CNY'
  },
  'Local Registration': {
    'zh-CN': '局部注册'
  },
  'Global Registration': {
    'zh-CN': '全局注册'
  }
}

module.exports = function (key, lang = 'en') {
  if (!list[key]) {
    return key
  }
  if (!list[key][lang]) {
    return key
  }
  return list[key][lang]
}
