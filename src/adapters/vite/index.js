/**
 * Vite 适配器 - 使用共享层的字体子集化插件
 */

import fs from 'fs'
import path from 'path'
import { subsetFont } from '../../core/subsetFont.js'
import { buildCss, buildCssForBundle } from '../../shared/css-generator.js'
import { collectCharacters } from '../../shared/scanner.js'
import { hashString, processFontConfig } from '../../shared/utils.js'

/**
 * Vite 字体子集化插件
 * @param {Object} options 插件配置
 * @returns {Object} Vite 插件对象
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

	let isBuild = false
	let projectRoot = process.cwd()
	let config = null
	const generatedAssets = [] // 存储生成的字体和 CSS 资源（带 type 字段区分）

	return {
		name: 'vite-plugin-font-subset',

		configResolved(resolvedConfig) {
			isBuild = resolvedConfig.command === 'build'
			projectRoot = resolvedConfig.root || process.cwd()
			config = resolvedConfig
		},

		async buildStart() {
			generatedAssets.length = 0

			if (!enabled || !isBuild || fonts.length === 0) {
				return
			}

			console.log('\n🔤 开始字体子集化...\n')

			try {
				// 1. 收集字符集（使用共享层）
				const chars = await collectCharacters(scanDirs, extraChars, projectRoot)
				console.log(`📊 收集到 ${chars.size} 个唯一字符`)

				// 2. 处理每个字体，收集信息（使用共享层）
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

				const assetsDir = config.build?.assetsDir || 'assets'

				// 3. 处理资源：生成开发态 CSS，并准备构建态资源
				for (const [cssDir, { entries, fonts }] of cssGroups) {
					// 3.1 生成开发态 CSS (写入源目录)
					if (generateCss) {
						const cssContent = buildCss(entries)
						const cssPath = path.join(cssDir, 'font.css')
						fs.writeFileSync(cssPath, cssContent)
						console.log(`   生成开发用 CSS: ${path.relative(projectRoot, cssPath)}`)
					}

					// 3.2 准备构建态资源 (计算路径和内容)
					const fontFileNames = new Map()

					// 处理字体文件（发射到 assetsDir/fonts 下）
					for (const font of fonts) {
						const hashPrefix = hashString(`${cssDir}:${font.fileName}`)
						const emittedFontFileName = `${hashPrefix}-${font.fileName}`
						const fileName = `${assetsDir}/fonts/${emittedFontFileName}`

						generatedAssets.push({
							type: 'font',
							fileName,
							source: font.buffer
						})

						// 这里记录的是"相对于 CSS 文件所在目录"的路径（仅文件名）
						fontFileNames.set(font.relativePath, emittedFontFileName)
					}

					// 处理 CSS 文件
					if (generateCss) {
						// 更新 CSS 中的字体路径为构建产物路径（相对于 CSS 文件所在目录）
						const updatedEntries = entries.map(entry => ({
							...entry,
							relativePath: fontFileNames.get(entry.relativePath) || entry.relativePath
						}))

						// 生成 CSS 内容（路径已更新为构建后的路径）
						const cssContent = buildCssForBundle(updatedEntries)

						// 计算 CSS 文件名
						const cssHash = hashString(cssContent)
						const cssFileName = `${assetsDir}/fonts/font-${cssHash}.css`

						generatedAssets.push({
							type: 'css',
							fileName: cssFileName,
							source: cssContent
						})

						console.log(`   准备发射 CSS: ${cssFileName}`)
					}
				}

				console.log('\n✅ 字体子集化完成！\n')
			} catch (error) {
				console.error('❌ 字体子集化失败:', error)
				throw error
			}
		},

		generateBundle() {
			if (!enabled || !isBuild || generatedAssets.length === 0) {
				return
			}

			// 统一发射所有资源
			for (const asset of generatedAssets) {
				this.emitFile({
					type: 'asset',
					fileName: asset.fileName,
					source: asset.source
				})
			}
		},

		transformIndexHtml() {
			if (!enabled || !isBuild || !generateCss || !injectCss) {
				return
			}

			// 从生成的资源中过滤出 CSS 文件
			const cssFiles = generatedAssets.filter(asset => asset.type === 'css')
			if (cssFiles.length === 0) {
				return
			}

			const base = config.base || '/'
			const normalizedBase = base.endsWith('/') ? base : `${base}/`
			const tags = []

			for (const cssAsset of cssFiles) {
				const href = `${normalizedBase}${cssAsset.fileName}`
				console.log(`   自动注入 CSS 到 HTML: ${href}`)

				tags.push({
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href
					},
					injectTo: 'head'
				})
			}

			return tags.length > 0 ? tags : undefined
		}
	}
}
