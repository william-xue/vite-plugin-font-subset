import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fontSubsetPlugin from '../src/adapters/vite/index.js'

const demoBase = process.env.VITE_DEMO_BASE ?? '/'

export default defineConfig({
  // 允许通过环境变量自定义基础路径（GitHub Pages 等场景）
  base: demoBase,
  plugins: [
    vue(),
    fontSubsetPlugin({
      // 配置需要处理的字体
      fonts: [
        {
          src: 'src/fonts/SourceHanSansCN-Medium.otf', // 源字体路径
          family: 'Source Han Sans CN',                  // 字体族名称
          weight: 400,                                    // 字重
          style: 'normal'                                 // 样式
        }
      ],
      // 扫描哪些文件来收集字符集
      scanDirs: ['src/**/*.{vue,js,ts,jsx,tsx,html}'],
      // 输出目录（相对于源字体文件）
      outputDir: 'subset',
      // 是否生成 CSS 文件
      generateCss: true,
      // 是否自动注入 CSS 到 HTML
      injectCss: true,
      // 额外的字符（确保包含）
      extraChars: '①②③④⑤⑥⑦⑧⑨⑩',
      // 仅在生产构建时启用
      enabled: true
    })
  ]
})