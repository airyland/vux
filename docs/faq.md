## Uncaught SyntaxError: Unexpected token export

[zh-CN]
引用Vux src组件源码的时候, js并没有被babel编译，因为默认webpack模板里的babel exclude了 `node_modules`。解决方法是为vux的代码添加一个babel loader:

``` js
{
  test: /vux.src.*?js$/,
  loader: 'babel'
}
```
或者直接使用 `vuxjs/webpack`模板
[/zh-CN]
