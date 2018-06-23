---
title: 如何贡献
---

# 如何贡献

## 文档更新

如果修改了组件代码，需要在组件目录的`metas.yml`加上changes，直接使用`next`作为版本号(如果已经存在该版本号，则直接添加变更条目即可)。

中括号内为变更类型，可选值 `fix` `enhance` `feature` `change`

比如：

``` yml
changes:
  next:
    en:
      - '[fix] fix *** bug #issueId'
      - '[feature] new feature'
    zh-CN:
      - '[fix] 修复 *** bug #issueId'
```

::: tip
当文档相关的 `PR`被合并后，文档服务器会在`5分钟`内拉取最新代码并执行`npm run build-docs`及`npm run build`实现文档及`demo`更新。
:::

## 为什么使用 next 为版本号

`next` 表示下个版本，未发布时在 `changelog` 里显示 `next`，提醒用户一些开发中的代码尚未发布。

当进行版本发布时，文档中的 `next` 会被脚本代替成真正的版本号，至此发布完毕。

这样的最大好处是更新代码时可以直接写 `changelog` 不用在意要写哪个版本号，在发布时翻 commit 记录写 `changelog` 是件比较浪费时间的事。
