import { defineConfig } from 'tsup'

export default defineConfig({
	entry: {
		'index': 'src/index.js',                    // 默认 Vite 适配器（向后兼容）
		'adapters/vite/index': 'src/adapters/vite/index.js',      // Vite 适配器
		'adapters/webpack/index': 'src/adapters/webpack/index.js',   // Webpack 适配器  
		'adapters/rollup/index': 'src/adapters/rollup/index.js',     // Rollup 适配器
		'presets/index': 'src/presets/index.js'     // 预设字符集模块
	},
	format: ['cjs', 'esm'],
	dts: true,
	clean: true,
	splitting: false,
	sourcemap: false,
	outDir: 'dist',
	external: ['html-webpack-plugin'] // 排除外部依赖，让用户在运行时安装
})
