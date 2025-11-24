# 如果去掉 emitFile() 会发生什么？

## 场景模拟

### ❌ 没有 emitFile()：
```
构建后的 dist 目录：
dist/
├── index.html  ← 包含 <link href="/assets/fonts/font-abc123.css">
└── assets/
    └── (空的，没有 fonts 目录)

浏览器访问：
GET /assets/fonts/font-abc123.css
❌ 404 Not Found（文件不存在）
```

### ✅ 有 emitFile()：
```
构建后的 dist 目录：
dist/
├── index.html  ← 包含 <link href="/assets/fonts/font-abc123.css">
└── assets/
    └── fonts/
        ├── abc12345-MyFont.woff2  ← 实际文件
        └── font-abc123.css        ← 实际文件

浏览器访问：
GET /assets/fonts/font-abc123.css
✅ 200 OK（文件存在并返回）
```

## 核心总结

`emitFile()` 是 Rollup/Vite 插件系统提供的 API，用于：
1. 告诉 Vite "我要输出一个文件"
2. Vite 接收后会在构建时将文件写入 dist 目录
3. 这样浏览器才能通过 HTTP 请求访问到这些文件

**没有 emitFile() = 文件只在内存，不在磁盘 = 浏览器 404**
