---
title: Uncaught SyntaxError: Unexpected token export
---

# Uncaught SyntaxError: Unexpected token export

原因是Vux的js源码没配置babel，你可以在webpack配置的loaders加上

  ``` js
  {
    test: /vux.src.*?js$/,
    loader: 'babel'
  }
  ```

  或者启用`vux-loader`的`vux-ui`插件。