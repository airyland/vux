---
title: rem 适配
---

# rem 适配

VUX项目使用`px`作为基本单位，如果您的项目中需要使用到`rem`单位，可以使用以下两个工具来转化

- [postcss-plugin-px2rem](https://github.com/pigcan/postcss-plugin-px2rem)，PostCSS插件，用于从px生成rem
- [lib-flexible](https://github.com/amfe/lib-flexible)，设置rem基准值

具体设置可以参考下面的代码
```js
module.exports = {
  'plugins': {
    // to edit target browsers: use "browserslist" field in package.json
    'postcss-import': {},
    'autoprefixer': {},
    'postcss-plugin-px2rem': {
      rootValue: 75, // 这里对应的是750的设计图尺寸
      selectorBlackList: ['html'],
      exclude: /node_modules|vux/i, // 过滤vux文件夹
      propBlackList: ['border-radius', 'border'] // 不需要转化为rem的属性
    }
  }
}
```
