---
title: vue 数字格式化
---

# number 格式化工具

`numberComma`用于分割数字，默认为3位分割，一般用于格式化`金额`。

`numberPad`用于按照位数补0

`numberRandom`用于生成两个整数范围内的随机整数

``` js
import { numberComma, numberPad, numberRandom } from 'vux'
numberComma(21342132) // 21,342,132
numberComma(21342132, 4) // 2134,2132
numberComma(21342132.234) // 21,342,132.234

numberPad(1) // 01
numberPad(234, 4) // 0234

numberRandom(1, 7) // 2
```
