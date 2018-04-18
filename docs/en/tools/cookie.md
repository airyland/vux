---
title: cookie
---

# cookie

``` js
import { cookie } from 'vux'
```

`get *cookie.get(name, [options])*`

获取 cookie 值。`options` 参数可选，取值如下：

1. `converter` 转换函数。如果所获取的 cookie 有值，会在返回前传给 `converter`
函数进行转换。
1. 选项对象。对象中可以有两个属性：`converter` 和 `raw`. `raw` 是布尔值，为真时，不会对获取到的
cookie 值进行 URI 解码。

**注**：如果要获取的 cookie 键值不存在，则返回 `undefined`.

例子：

```js
// setup
document.cookie = 'foo=1'
document.cookie = 'bar=2'

cookie.get('foo')
// returns '1'

cookie.get('bar', function(s) { return parseInt(s); } )
// returns 2
```


`set *cookie.set(name, value, [options])`

设置 cookie 值。参数 `options` 可选，可以有以下属性：`path`（字符串）、`domain`（字符串）、
`expires`（数值或日期对象）、`raw`（布尔值）。当 `raw` 为真值时，在设置 cookie 值时，不会进行
URI 编码。

例子：

```js
cookie.set('foo', 3)

cookie.set('bar', 4, {
  domain: 'example.com',
  path: '/',
  expires: 30
})
````


`remove *cookie.remove(name, [options])`

移除指定的 cookie.

例子：

```js
cookie.remove('foo')

cookie.remove('bar', {
  domain: 'example.com',
  path: '/'
})
```
