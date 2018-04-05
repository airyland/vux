---
title: vue date 日期格式化
---

# date 日期格式化

相对`moment`来说`十分轻量`的实现。


## 使用

``` js
import { dateFormat } from 'vux'

dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
```

## 作为 filter 使用

``` js
import { dateFormat } from 'vux'

export default {
  filters: {
    dateFormat
  }
}

```