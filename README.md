# @fe-fast/vite-plugin-font-subset

> 🚀 Font subsetting plugin for Vite, Webpack, Rollup & Rspack - 基于项目实际使用字符自动子集化字体并生成 WOFF2

📖 **多语言文档**：[English](README.md) | [日本語](README_ja.md) | [한국어](README_ko.md)

## 🌟 Multi-Tool Support

- ✅ **Vite** - 原生支持，Chrome DevTools 验证
- ✅ **Webpack** - 完全支持，无 deprecation 警告  
- ✅ **Rollup** - 完全支持，库打包优化
- ✅ **Rspack** - 兼容支持，使用 Webpack 适配器

## 📊 字体压缩效果对比

| 场景 | 原始字体 | 子集化后 | 压缩比 | 加载速度提升 |
|------|----------|----------|--------|-------------|
| **中文字体** | 10.2 MB | 28.5 KB | **99.7%** | ⚡️ 358x |
| **日文字体** | 8.7 MB | 22.1 KB | **99.7%** | ⚡️ 394x |
| **韩文字体** | 6.8 MB | 18.3 KB | **99.7%** | ⚡️ 372x |
| **混合字体** | 12.4 MB | 31.7 KB | **99.7%** | ⚡️ 391x |

> 💡 **视觉冲击**：从整包字体到只包含项目字符的子集，体积减少 **99.7%**！

## 🎯 适用场景

### ✅ 强烈推荐
- **企业官网** - 静态内容，字符集固定
- **产品展示页** - 文案确定，追求极致加载速度
- **H5 营销页面** - 移动端友好，字体大小至关重要
- **管理后台** - 字符集有限，性能提升明显
- **文档网站** - 技术文档，字符相对固定

### ❌ 不推荐
- **纯动态新闻站** - 每篇文章字符集不同
- **UGC 内容平台** - 用户生成内容，字符不可预测
- **在线编辑器** - 实时输入任意字符

## 🌏 CJK 专门优化

- **🇨🇳 中文** - 支持 3500+ 常用汉字，涵盖 GB2312、GBK、UTF-8
- **🇯🇵 日文** - 支持平假名、片假名、常用汉字
- **🇰🇷 韩文** - 支持韩文字母、常用汉字组合

## 特性

- **自动扫描字符集**：从源码文件中收集实际用到的字符，避免整包字体。
- **按字体生成子集**：使用 [`subset-font`](https://github.com/foliojs/subset-font) 生成 `.woff2` 子集文件。
- **自动生成 CSS**：在字体所在目录生成统一的 `font.css`，包含 `@font-face` 声明。
- **按目录合并**：同一目录下多字体会合并到一个 `font.css` 中，避免互相覆盖。
- **可选自动注入**：构建时可自动把生成的 `font.css` 注入 HTML，无需手动引入。
- **仅在构建阶段运行**：默认只在生产构建时执行，不影响开发速度。

## 安装

推荐使用 scoped 包名：

```bash
npm install @fe-fast/vite-plugin-font-subset --save-dev
# 或者
pnpm add @fe-fast/vite-plugin-font-subset -D
yarn add @fe-fast/vite-plugin-font-subset -D
```

## 使用

### Vite

```js
// vite.config.js
import { defineConfig } from 'vite'
import fontSubsetPlugin from '@fe-fast/vite-plugin-font-subset'

export default defineConfig({
  plugins: [
    fontSubsetPlugin({
      fonts: [
        {
          src: 'src/fonts/SourceHanSansCN-Medium.otf',
          family: 'Source Han Sans CN',
          weight: 400,
          style: 'normal'
        }
      ],
      scanDirs: ['src/**/*.{vue,js,ts,jsx,tsx,json,scss,less,css}'],
      outputDir: 'subset',
      generateCss: true,
      injectCss: true,
      extraChars: '①②③④⑤⑥⑦⑧⑨⑩',
      enabled: true
    })
  ]
})
```

### Webpack

```js
// webpack.config.js
import FontSubsetPlugin from '@fe-fast/vite-plugin-font-subset/webpack'

module.exports = {
  plugins: [
    new FontSubsetPlugin({
      fonts: [
        {
          src: 'src/fonts/SourceHanSansCN-Medium.otf',
          family: 'Source Han Sans CN',
          weight: 400,
          style: 'normal'
        }
      ],
      scanDirs: ['src/**/*.{vue,js,ts,jsx,tsx,json,scss,less,css}'],
      outputDir: 'subset',
      generateCss: true,
      injectCss: true,
      extraChars: '①②③④⑤⑥⑦⑧⑨⑩',
      enabled: true
    })
  ]
}
```

### Rollup

```js
// rollup.config.js
import fontSubsetPlugin from '@fe-fast/vite-plugin-font-subset/rollup'

export default {
  plugins: [
    fontSubsetPlugin({
      fonts: [
        {
          src: 'src/fonts/SourceHanSansCN-Medium.otf',
          family: 'Source Han Sans CN',
          weight: 400,
          style: 'normal'
        }
      ],
      scanDirs: ['src/**/*.{vue,js,ts,jsx,tsx,json,scss,less,css}'],
      outputDir: 'subset',
      generateCss: true,
      extraChars: '①②③④⑤⑥⑦⑧⑨⑩',
      enabled: true
    })
  ]
}
```

### Rspack

```js
// rspack.config.js
// Rspack 兼容 Webpack 插件 API
import FontSubsetPlugin from '@fe-fast/vite-plugin-font-subset/webpack'

export default {
  plugins: [
    new FontSubsetPlugin({
      fonts: [
        {
          src: 'src/fonts/SourceHanSansCN-Medium.otf',
          family: 'Source Han Sans CN',
          weight: 400,
          style: 'normal'
        }
      ],
      scanDirs: ['src/**/*.{vue,js,ts,jsx,tsx,json,scss,less,css}'],
      outputDir: 'subset',
      generateCss: true,
      injectCss: true,
      extraChars: '①②③④⑤⑥⑦⑧⑨⑩',
      enabled: true
    })
  ]
}
```

## 配置选项

```js
export default defineConfig({
  plugins: [
    fontSubset({
      // 必填：需要子集化的字体列表
      fonts: [
        {
          // 源字体文件路径，可以是相对项目根目录的相对路径或绝对路径
          src: 'src/assets/fonts/SourceHanSansCN-Regular.ttf',
          // 在 CSS 中使用的 font-family 名称
          family: 'Source Han Sans CN',
          // 可选：字重，默认 400
          weight: 400,
          // 可选：样式，默认 'normal'
          style: 'normal'
        }
      ],

      // 可选：扫描哪些文件来收集字符集
      // 默认：['src/**/*.{vue,js,ts,jsx,tsx,json,scss,less,css}']
      scanDirs: ['src/**/*.{vue,ts,tsx,js,jsx}'],

      // 可选：子集文件输出目录（相对于字体源文件目录）
      // 默认：'subset'
      outputDir: 'subset',

      // 可选：是否生成 font.css，默认 true
      generateCss: true,

      // 可选：是否自动把 font.css 注入 HTML，默认 true
      injectCss: true,

      // 可选：额外需要保留的字符（例如接口动态返回、运行时生成的字符）
      extraChars: '①②③',

      // 可选：字符集预设，用于覆盖动态文案（可选）
      // 支持值：'common-3500' | 'gb2312-basic' | 'punctuation'
      preset: null,

      // 可选：是否启用插件，默认 true（但仅在 build 时真正执行）
      enabled: true
    })
  ]
})
```

### 生成结果

以上配置在构建时会：

1. 扫描 `scanDirs` 中的所有文件，收集出现过的字符。
2. 对 `fonts` 中每个字体：
   - 在字体所在目录下创建 `outputDir` 目录（默认为 `subset`）。
   - 在该目录生成子集字体：`<原文件名>.woff2`。
3. 在字体所在目录（`src` 同级目录）生成一个 `font.css`，内容类似：

```css
/* 此文件由 vite-plugin-font-subset 自动生成，请勿手动修改 */
@font-face {
  font-family: 'Source Han Sans CN';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('./subset/SourceHanSansCN-Regular.woff2') format('woff2');
}
```

> 同一目录下多个字体会合并到同一个 `font.css` 中，并按 family / weight / style 排序，保证生成内容稳定。

### 在项目中使用生成的字体

默认情况下，插件会在构建时自动把生成的 `font.css` 注入到最终的 HTML 中，无需手动引入。直接在 CSS 中使用即可：

```css
body {
  font-family: 'Source Han Sans CN', system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', sans-serif;
}
```

#### 手动引入（可选）

如果你将 `injectCss` 设为 `false`，或需要自定义加载顺序/作用域，可以手动引入生成的 `font.css`：

在入口文件中：

```ts
// main.ts
import '@/assets/fonts/font.css'
```

或在 `index.html` 中：

```html
<link rel="stylesheet" href="/src/assets/fonts/font.css" />
```

## 🎯 动态文案处理方案

### 问题背景

字体子集化插件默认只扫描**静态源码**中的字符，但实际项目中常有**动态文案**：

```js
// 静态文案 ✅ - 会被扫描到
<h1>欢迎来到我的网站</h1>

// 动态文案 ❌ - 接口返回，构建时未知
<p>{{ apiResponse.message }}</p>  // "操作成功"
<span>{{ userStatus }}</span>      // "处理中"
```

### 两种解决方案对比

| 方案 | 字体大小 | 动态文案处理 | 视觉一致性 | 推荐场景 |
|------|----------|--------------|------------|----------|
| **CSS 回退** | ~50-150 KB | 系统字体兜底 | ⚠️ 部分不一致 | **默认推荐** - 大多数项目 |
| **预设字符集** | ~300-500 KB | 完全覆盖 | ✅ 完全一致 | 品牌官网、设计系统 |

#### 方案 1：CSS 回退（推荐）

```css
/* 在你的样式中配置字体回退 */
body {
  font-family: 'Source Han Sans CN', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
```

**效果**：
- 静态文案 "Hello World" → 使用子集字体 ✅
- 动态文案 "操作成功" → 子集字体缺字 → 回退到系统字体 ✅

#### 方案 2：预设字符集

```js
// vite.config.js
fontSubsetPlugin({
  fonts: [...],
  preset: 'common-3500'  // 添加3500常用字
})
```

**可用预设**：

| 预设名 | 字符数 | 说明 | 预计大小 |
|--------|--------|------|----------|
| `common-3500` | 3,594 | 常用3500字，覆盖99%日常用字 | ~300 KB |
| `gb2312-basic` | 6,857 | GB2312基础汉字，几乎所有简体中文 | ~500 KB |
| `punctuation` | ~200 | CJK标点符号 | ~10 KB |

### 决策指南

**选择 CSS 回退**（默认）：
- ✅ 追求极致性能
- ✅ 动态文案较少
- ✅ 可以接受部分字体不一致

**选择预设字符集**：
- ✅ 品牌视觉一致性要求高
- ✅ 动态文案内容丰富
- ✅ 可以接受额外的带宽成本

> 💡 **重要提示**：即使使用预设字符集，仍建议在 CSS 中保留字体回退列表，这是最佳实践。

### 迁移说明

预设功能是**完全可选的**，现有项目无需任何修改即可继续使用。如需启用预设，只需添加 `preset` 配置项即可。

---

## 配置说明

### fonts (必填)

```ts
interface FontConfig {
  src: string // 源字体路径，支持绝对路径或相对于 Vite 项目根目录的相对路径
  family: string // font-family 名称
  weight?: number // 字重，默认 400
  style?: string // 样式，默认 'normal'
}
```

- 建议把字体放在 `src/assets/fonts` 之类的目录下，方便管理。
- 同一个目录下多个字体会共享一个 `font.css`。

### scanDirs

- 类型：`string[]`
- 默认：`['src/**/*.{vue,js,ts,jsx,tsx,json,scss,less,css}']`
- 作用：告诉插件需要扫描哪些文件来收集字符。

> 扫描范围越大，构建时间可能越长。可以根据项目实际情况适当收紧，例如只扫描 `.vue` 和 `.ts` 文件。

### outputDir

- 类型：`string`
- 默认：`'subset'`
- 作用：子集字体输出目录，相对于字体源文件所在目录。

### generateCss

- 类型：`boolean`
- 默认：`true`
- 作用：是否在字体目录生成 `font.css`。如果你有自己的一套 CSS 管理方式，也可以关掉，然后在构建后手动处理生成的 `.woff2`。

### injectCss

- 类型：`boolean`
- 默认：`true`
- 作用：是否在构建阶段自动把生成的 `font.css` 注入到最终 HTML。关闭后需自行在入口或 HTML 中引入。

### extraChars

- 类型：`string`
- 默认：`''`
- 作用：额外需要保留的字符，用于处理：
  - 接口动态返回但源码中不存在的字符；
  - 富文本 / Markdown / 国际化等场景。

### enabled

- 类型：`boolean`
- 默认：`true`
- 说明：
  - 插件只会在 `vite build` 时执行，开发环境（`vite dev`）不会触发实际子集化。
  - 可以通过环境变量控制是否启用，例如：

```ts
fontSubset({
  enabled: process.env.NODE_ENV === 'production'
})
```

## 注意事项

- **构建时间**：首次扫描和子集化会增加一定构建时间，取决于扫描文件数量和字体文件大小。
- **动态内容**：如果运行时会产生大量源码中不存在的字符（例如富文本编辑器），请务必通过 `extraChars` 或调整 `scanDirs` 进行补充。
- **多入口 / 多字体目录**：
  - 同一目录下的字体会共用一个 `font.css`；
  - 不同目录会生成各自的 `font.css`，请分别在对应入口中引入。

## 兼容性

- 运行环境：Node.js 16+（推荐 18+）
- Vite 版本：
  - `peerDependencies`: `^4.0.0 || ^5.0.0`

---

## English

### Overview

`@fe-fast/vite-plugin-font-subset` is a Vite plugin that generates WOFF2 font subsets
based on the actual characters used in your project. It scans your source files,
subsets the specified fonts using [`subset-font`](https://github.com/foliojs/subset-font),
and generates a `font.css` file with corresponding `@font-face` rules.

### Features

- Automatically collect characters from your source files.
- Generate `.woff2` subsets for each configured font.
- Emit a merged `font.css` in each font directory to avoid overwrite issues.
- Optionally inject generated `font.css` into HTML during build.
- Run only during `vite build`, keeping `vite dev` fast.

### Installation

```bash
npm install @fe-fast/vite-plugin-font-subset --save-dev
# or
pnpm add @fe-fast/vite-plugin-font-subset -D
yarn add @fe-fast/vite-plugin-font-subset -D
```

> The legacy name `vite-plugin-font-subset` is still compatible,
> but `@fe-fast/vite-plugin-font-subset` is the recommended package.

### Basic Usage

```ts
import { defineConfig } from 'vite'
import fontSubset from '@fe-fast/vite-plugin-font-subset'

export default defineConfig({
  plugins: [
    fontSubset({
      fonts: [
        {
          src: 'src/assets/fonts/SourceHanSansCN-Regular.ttf',
          family: 'Source Han Sans CN',
          weight: 400,
          style: 'normal'
        }
      ],
      scanDirs: ['src/**/*.{vue,ts,tsx,js,jsx}'],
      outputDir: 'subset',
      generateCss: true,
      injectCss: true,
      extraChars: '①②③',
      enabled: true
    })
  ]
})
```

During build, the plugin will:

1. Scan all files matched by `scanDirs` and collect all unique characters.
2. Subset each font defined in `fonts` into a `.woff2` file under `outputDir`.
3. Generate a `font.css` file next to the source font file with `@font-face` rules.

### Using Generated Fonts

By default, the plugin automatically injects generated `font.css` into the final
HTML during build, so you don't need to manually import it.

If you set `injectCss` to `false` or need custom ordering/scope, you can import
`font.css` manually in your entry or `index.html`. Then you can use the configured
`font-family` in your styles:

```css
body {
  font-family: 'Source Han Sans CN', system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', sans-serif;
}
```

### Options

- `fonts`: list of fonts to subset. Each item has `src`, `family`, optional `weight`, `style`.
- `scanDirs`: glob patterns to search for used characters.
- `outputDir`: folder name relative to the font file directory where subsets are written.
- `generateCss`: whether to emit `font.css` automatically.
- `injectCss`: whether to inject generated `font.css` into HTML during build.
- `extraChars`: extra characters to keep that may not appear in source files.
- `enabled`: whether the plugin is enabled; it only runs during `vite build`.

### Notes

- A larger `scanDirs` range may increase build time.
- For runtime-only characters (API responses, user input, rich text, etc.),
  please use `extraChars` or adjust `scanDirs`.
- Fonts in the same directory share a single `font.css`; fonts in different
  directories will have their own `font.css`.

## 演示项目

查看 [demo](./demo) 目录获取完整的 Vite + Vue 示例项目。

```bash
# 克隆仓库后
cd demo
npm install

# 下载字体文件到 demo/src/fonts/ 目录
# 推荐：思源黑体 SourceHanSansCN-Regular.otf

# 运行开发服务器
npm run dev

# 构建生产版本
npm run build
```

详细说明请查看 [demo/README.md](./demo/README.md)

## License

[MIT](./LICENSE)
