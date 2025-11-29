/**
 * Rollup 适配器 - 字体子集化插件
 */

import fs from 'fs'
import path from 'path'
import { subsetFont } from '../../core/subsetFont.js'
import { buildCss, buildCssForBundle } from '../../shared/css-generator.js'
import { collectCharacters } from '../../shared/scanner.js'
import { hashString, processFontConfig } from '../../shared/utils.js'

/**
 * Rollup 字体子集化插件
 * @param {Object} options 插件配置
 * @returns {Object} Rollup 插件对象
 */
export default function fontSubsetPlugin(options = {}) {
	const {
		// 源字体配置
		fonts = [],
		// 扫描路径
		scanDirs = ['src/**/*.{vue,js,ts,jsx,tsx,json,scss,less,css}'],
		// 输出目录（相对于字体源文件）
		outputDir = 'subset',
		// 是否生成 font.css
		generateCss = true,
		// 是否自动把生成的 CSS 注入构建产物
		injectCss = true,
		// 额外字符集
		extraChars = '',
		// 是否启用（默认仅在生产构建时启用）
		enabled = true
	} = options

	let projectRoot = process.cwd()
	const generatedAssets = []

	return {
		name: 'rollup-plugin-font-subset',

		// 构建开始时处理字体
		async buildStart(options) {
			if (!enabled || fonts.length === 0) {
				return
			}

			console.log('\n🔤 Rollup 开始字体子集化...\n')
			generatedAssets.length = 0

			try {
				// 1. 收集字符集（使用共享层）
				const chars = await collectCharacters(scanDirs, extraChars, projectRoot)
				console.log(`📊 收集到 ${chars.size} 个唯一字符`)

				// 2. 处理每个字体（使用共享层）
				const cssGroups = new Map()
				for (const fontConfig of fonts) {
					const result = await processFontConfig(fontConfig, chars, outputDir, projectRoot, subsetFont)
					if (result) {
						const { cssDir, cssEntry, buffer } = result

						if (!cssGroups.has(cssDir)) {
							cssGroups.set(cssDir, { entries: [], fonts: [] })
						}
						cssGroups.get(cssDir).entries.push(cssEntry)
						cssGroups.get(cssDir).fonts.push({
							relativePath: cssEntry.relativePath,
							fileName: path.basename(cssEntry.relativePath),
							buffer
						})
					}
				}

				// 3. 生成 CSS 和准备资源
				for (const [cssDir, { entries, fonts }] of cssGroups) {
					// 3.1 生成开发态 CSS
					if (generateCss) {
						const cssContent = buildCss(entries)
						const cssPath = path.join(cssDir, 'font.css')
						fs.writeFileSync(cssPath, cssContent)
						console.log(`   生成开发用 CSS: ${path.relative(projectRoot, cssPath)}`)
					}

					// 3.2 准备构建态资源
					const fontFileNames = new Map()
					for (const font of fonts) {
						const hashPrefix = hashString(`${cssDir}:${font.fileName}`)
						const emittedFontFileName = `${hashPrefix}-${font.fileName}`
						
						generatedAssets.push({
							type: 'font',
							fileName: `assets/fonts/${emittedFontFileName}`,
							source: font.buffer
						})

						fontFileNames.set(font.relativePath, emittedFontFileName)
					}

					// 3.3 处理 CSS 文件
					if (generateCss) {
						const updatedEntries = entries.map(entry => ({
							...entry,
							relativePath: fontFileNames.get(entry.relativePath) || entry.relativePath
						}))

						const cssContent = buildCssForBundle(updatedEntries)
						const cssHash = hashString(cssContent)
						const cssFileName = `assets/fonts/font-${cssHash}.css`

						generatedAssets.push({
							type: 'css',
							fileName: cssFileName,
							source: cssContent
						})

						console.log(`   准备发射 CSS: ${cssFileName}`)
					}
				}

				console.log('\n✅ Rollup 字体子集化完成！\n')
			} catch (error) {
				console.error('❌ Rollup 字体子集化失败:', error)
				throw error
			}
		},

		// 发射资源
		generateBundle(options, bundle) {
			for (const asset of generatedAssets) {
				this.emitFile({
					type: 'asset',
					fileName: asset.fileName,
					source: asset.source
				})
			}
		},

		// 可选：HTML 注入（需要配合 @rollup/plugin-html）
		async renderChunk(code, chunk, options) {
			if (!injectCss || generatedAssets.length === 0) {
				return null
			}

			const cssFiles = generatedAssets.filter(asset => asset.type === 'css')
			if (cssFiles.length === 0 || !chunk.isEntry) {
				return null
			}

			// 为入口文件添加 CSS 导入
			const cssImports = cssFiles.map(cssAsset => 
				`import "/${cssAsset.fileName}";`
			).join('\n')

			return cssImports + '\n' + code
		}
	}
}
