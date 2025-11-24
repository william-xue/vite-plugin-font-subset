# Vite Font Subset Plugin - Demo

这是 `vite-plugin-font-subset` 的演示项目，展示如何在 Vite + Vue 项目中使用字体子集化插件。

## 📦 功能特性

- ✅ 自动扫描项目字符集
- ✅ 生成 WOFF2 格式字体子集
- ✅ 大幅减小字体文件体积
- ✅ 自动注入 CSS 到 HTML
- ✅ 开发和生产环境都支持

## 🚀 快速开始

### 1. 安装依赖

```bash
cd demo
npm install
```

### 2. 准备字体文件

**重要**：需要将字体文件放在 `demo/src/fonts/` 目录下。

推荐使用思源黑体（Source Han Sans）进行测试：
- 下载地址：https://github.com/adobe-fonts/source-han-sans/releases
- 下载后将 `SourceHanSansCN-Regular.otf` 放入 `demo/src/fonts/` 目录

或者使用其他 `.ttf` / `.otf` 字体文件，然后修改 `vite.config.js` 中的配置。

### 3. 运行开发服务器

```bash
npm run dev
```

浏览器访问 http://localhost:5173

**开发模式说明**：
- 插件会在 `src/fonts/subset/` 目录生成字体子集
- 同时生成 `font.css` 文件
- 这些文件可以手动引入进行开发调试

### 4. 构建生产版本

```bash
npm run build
```

**构建后**：
- 字体和 CSS 会输出到 `dist/assets/fonts/` 目录
- CSS 会自动注入到 HTML 的 `<head>` 中
- 查看 `dist/` 目录，字体文件体积会大幅减小

### 5. 预览构建结果

```bash
npm run serve
```

浏览器访问 http://localhost:3000 查看效果。

**注意**：推荐使用 `npm run serve` 而不是 `npm run preview`，因为 Vite preview 对动态生成的 CSS 文件 MIME 类型处理有问题。

## 🌐 部署到 GitHub Pages

项目已经内置 `.github/workflows/deploy-demo.yml`，会在 `main` 分支更新时自动构建 `demo` 并部署到 GitHub Pages。

### 配置步骤

1. 在 GitHub 仓库中打开 **Settings → Pages**，将 Source 选择为 **GitHub Actions**。
2. 确保主分支已经包含本目录及工作流文件。
3. 推送代码后，GitHub Actions 会自动：
   - 安装根项目和 demo 的依赖
   - 以 `VITE_DEMO_BASE=/vite-plugin-font-subset/` 构建 demo
   - 将 `demo/dist` 发布为 Pages 站点

**注意**：字体文件已提交到仓库用于 CI 演示。如果替换为其他字体，需确保文件不会太大（建议 < 20MB），否则考虑使用 Git LFS。### 手动本地验证

如果希望在本地模拟 GitHub Pages 的路径行为，可以运行：

```bash
cd demo
VITE_DEMO_BASE=/vite-plugin-font-subset/ pnpm build
npm run serve
```

浏览器访问 http://localhost:3000/vite-plugin-font-subset/ 验证资源路径是否正确。

## ⚙️ 配置说明

在 `vite.config.js` 中配置插件：

```javascript
import fontSubsetPlugin from '../src/index.js'

export default defineConfig({
  plugins: [
    vue(),
    fontSubsetPlugin({
      // 字体配置
      fonts: [
        {
          src: 'src/fonts/SourceHanSansCN-Regular.otf', // 字体文件路径
          family: 'Source Han Sans CN',                  // CSS font-family 名称
          weight: 400,                                    // 字重
          style: 'normal'                                 // 样式
        }
      ],
      
      // 扫描哪些文件来收集字符
      scanDirs: ['src/**/*.{vue,js,ts,jsx,tsx,html}'],
      
      // 输出目录（相对于源字体文件）
      outputDir: 'subset',
      
      // 是否生成 CSS 文件
      generateCss: true,
      
      // 是否自动注入 CSS 到 HTML（生产构建）
      injectCss: true,
      
      // 额外需要包含的字符
      extraChars: '',
      
      // 是否启用（默认仅生产构建启用）
      enabled: true
    })
  ]
})
```

## 📁 项目结构

```
demo/
├── index.html           # HTML 入口
├── package.json         # 依赖配置
├── vite.config.js       # Vite 配置（含插件配置）
└── src/
    ├── main.js          # 应用入口
    ├── App.vue          # 主组件
    ├── style.css        # 全局样式
    └── fonts/
        ├── SourceHanSansCN-Regular.otf  # 源字体文件（需自行下载）
        └── subset/                       # 插件生成的字体子集（自动生成）
            ├── SourceHanSansCN-Regular.woff2
            └── font.css
```

## 🎯 使用效果

### 开发模式

运行 `npm run dev` 后：

1. 插件扫描 `src/**/*.{vue,js,ts,jsx,tsx,html}` 文件
2. 收集所有使用的字符
3. 生成字体子集到 `src/fonts/subset/`
4. 生成 `font.css` 文件

你可以在代码中手动引入：
```javascript
import './fonts/subset/font.css'
```

### 生产构建

运行 `npm run build` 后：

1. 插件执行相同的字符收集
2. 将字体子集输出到 `dist/assets/fonts/`
3. 将 CSS 输出到 `dist/assets/fonts/`
4. **自动在 HTML 中注入 `<link>` 标签**

无需手动引入，字体会自动生效！

## 📊 效果对比

| 项目 | 原始字体 | 子集字体 | 压缩率 |
|------|---------|---------|--------|
| 思源黑体 Regular | ~15 MB | ~100-500 KB | 96-98% |

*实际大小取决于项目中使用的字符数量*

## 💡 提示

1. **字体文件路径**：确保 `vite.config.js` 中的 `src` 路径正确
2. **字体族名称**：`family` 需要与 CSS 中使用的 `font-family` 一致
3. **扫描路径**：根据项目实际情况调整 `scanDirs` 配置
4. **多字体支持**：可以在 `fonts` 数组中配置多个字体

## 🔧 故障排除

### 字体未生效

1. 检查字体文件是否存在于 `src/fonts/` 目录
2. 检查 `vite.config.js` 中的路径配置
3. 查看控制台输出，确认插件是否正常执行
4. 运行生产构建 `npm run build`（插件默认仅在构建时启用）

### 字体文件过大

- 检查是否有不必要的文件被扫描
- 调整 `scanDirs` 配置，排除不需要的文件

## 📚 更多文档

查看主项目 README：[../README.md](../README.md)

## 🙋 问题反馈

如有问题，请在 GitHub 仓库提 Issue：
https://github.com/william-xue/vite-plugin-font-subset/issues
