---
title: 为什么不能直接引用 cdn 链接
---

# 为什么不能直接引用 cdn 链接

原因见 <router-link to="/zh-CN/faq/why-use-vue-file-for-distribution.html">为什么使用 .vue 源码分发而不是 js 文件</router-link>。因为并不会在源码里提供 umd 脚本也不会在发布时发布 umd 脚本，因此没有 cdn 链接。