# 快速上手（文档补充中...）

## 安装

* 通过 Npm 或 Yarn 安装

## 注意事项

- 使用:prop传递数据格式为 数字、布尔值或函数时，必须带:(兼容字符串类型除外)，比如：
```html
<vux-switch :active="true" size="base"></vux-switch>
```

- 组件 css 单位使用的是 **px**，如果你的项目中需要 **rem** 单位，可借助一些工具进行转换，比如 [webpack](https://www.webpackjs.com/) 的 [px2rem-loader](https://www.npmjs.com/package/px2rem-loader)、[postcss](https://github.com/postcss/postcss) 的 [postcss-plugin-px2rem](https://www.npmjs.com/package/postcss-plugin-px2rem) 插件等
 