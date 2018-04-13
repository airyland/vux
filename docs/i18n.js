const list = {
  faq: {
    'zh-CN': '常见问题'
  },
  title: {
    'en': 'VUX - Vue.js Component Framework - Vue Mobile UI',
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
    'zh-CN': '也可以在入口文件全局引入'
  },
  'qr': {
    'en': 'view on mobile',
    'zh-CN': '二维码'
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
