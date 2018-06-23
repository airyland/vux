---
title: 微信 Vue 单页面应用设置标题
---

# 微信 Vue 单页面应用设置标题

在微信`iOS` `webview`更新到`WKWebView`之前我们可以通过加载一个 `iframe` 来实现单页面应用`title`更改。但是17年初更新到 `WKWebView` 后该方法也失效。

目前该问题已经解决，在微信 iOS 客户端 `6.3.5` 之后的版本都可以通过 `document.title` 设置标题了。