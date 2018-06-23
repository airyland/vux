---
title: vue-loader 禁用 eslint
---

# 禁用 eslint

并不推荐禁用`eslint`, 编码规范可以一定程序上保证代码质量。但是如果你确实想禁用，可以删除`build/webpack.base.conf.js`里的相关代码。

``` js
preLoaders: [
  {
   test: /\.vue$/,
   loader: 'eslint',
   include: [
     path.join(projectRoot, 'src')
   ],
   exclude: /node_modules/
  },
  {
   test: /\.js$/,
   loader: 'eslint',
   include: [
     path.join(projectRoot, 'src')
   ],
   exclude: /node_modules/
  }
]
```

如果你只是想禁用对某一文件的检测，那么可以在`.eslintignore`里添加规则。

如果你是想禁止某一行的检测，那么可以使用`// eslint-disable-line`。

更加灵活的使用参考 [eslint文档](http://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments)。
