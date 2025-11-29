/**
 * Webpack 适配器 - 字体子集化插件
 */

import fs from 'fs'
import path from 'path'
import { subsetFont } from '../../core/subsetFont.js'
import { buildCss, buildCssForBundle } from '../../shared/css-generator.js'
import { collectCharacters } from '../../shared/scanner.js'
import { hashString, processFontConfig } from '../../shared/utils.js'

// 动态导入 html-webpack-plugin，避免 CJS/ESM 兼容性问题
const getHtmlWebpackPlugin = () => {
  try {
    // 尝试使用全局 require (CJS 环境)
    if (typeof global !== 'undefined' && global.require) {
      return global.require('html-webpack-plugin')
    }
    // 尝试使用 require (如果可用)
    if (typeof require !== 'undefined') {
      return require('html-webpack-plugin')
    }
    // 最后尝试动态 import (ESM 环境)
    return import('html-webpack-plugin').then(m => m.default)
  } catch {
    return null
  }
}

class FontSubsetPlugin {
	constructor(options = {}) {
		this.options = {
			// 源字体配置
			fonts: [],
			// 扫描路径
			scanDirs: ['src/**/*.{vue,js,ts,jsx,tsx,json,scss,less,css}'],
			// 输出目录（相对于字体源文件）
			outputDir: 'subset',
			// 是否生成 font.css
			generateCss: true,
			// 是否自动把生成的 CSS 注入构建产物
			injectCss: true,
			// 额外字符集
			extraChars: '',
			// 是否启用（默认仅在生产构建时启用）
			enabled: true,
			...options
		}
		this.projectRoot = process.cwd()
		this.generatedAssets = []
	}

	apply(compiler) {
		// 只在生产模式下运行
		if (compiler.options.mode !== 'production' && !this.options.enabled) {
			return
		}

		// 在编译开始前执行字体子集化
		compiler.hooks.make.tapAsync('FontSubsetPlugin', async (compilation, callback) => {
			await this.processFonts(compiler.context || this.projectRoot)
			callback()
		})

		// 发射资源到输出目录（使用 processAssets 避免废弃警告）
		compiler.hooks.thisCompilation.tap('FontSubsetPlugin', (compilation) => {
			compilation.hooks.processAssets.tapAsync(
				{
					name: 'FontSubsetPlugin',
					stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
				},
				(assets, callback) => {
					this.emitAssets(compilation)
					callback()
				}
			)
		})

		// 注入 CSS 到 HTML
		if (this.options.injectCss) {
			compiler.hooks.compilation.tap('FontSubsetPlugin', (compilation) => {
				const HtmlWebpackPlugin = getHtmlWebpackPlugin()
				if (!HtmlWebpackPlugin) {
					// HtmlWebpackPlugin 未安装，跳过 CSS 注入
					return
				}

				if (HtmlWebpackPlugin.getHooks) {
					// webpack 5 + HtmlWebpackPlugin 5.x
					HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
						'FontSubsetPlugin',
						(data, callback) => {
							this.injectCssToHtml(data)
							callback(null, data)
						}
					)
				} else {
					// 兼容旧版本
					compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
						'FontSubsetPlugin',
						(data, callback) => {
							this.injectCssToHtml(data)
							callback(null, data)
						}
					)
				}
			})
		}
	}

	async processFonts(projectRoot) {
		const { fonts, scanDirs, extraChars, outputDir, generateCss, enabled } = this.options
		
		if (!enabled || fonts.length === 0) {
			return
		}

		console.log('\n🔤 开始字体子集化...\n')

		try {
			// 1. 收集字符集
			const chars = await collectCharacters(scanDirs, extraChars, projectRoot)
			console.log(`📊 收集到 ${chars.size} 个唯一字符`)

			// 2. 处理每个字体
			this.generatedAssets = []
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

				// 处理字体文件
				for (const font of fonts) {
					const hashPrefix = hashString(`${cssDir}:${font.fileName}`)
					const emittedFontFileName = `${hashPrefix}-${font.fileName}`

					this.generatedAssets.push({
						type: 'font',
						fileName: `fonts/${emittedFontFileName}`,
						source: font.buffer
					})

					fontFileNames.set(font.relativePath, emittedFontFileName)
				}

				// 处理 CSS 文件
				if (generateCss) {
					const updatedEntries = entries.map(entry => ({
						...entry,
						relativePath: fontFileNames.get(entry.relativePath) || entry.relativePath
					}))

					const cssContent = buildCssForBundle(updatedEntries)
					const cssHash = hashString(cssContent)
					const cssFileName = `fonts/font-${cssHash}.css`

					this.generatedAssets.push({
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
	}

	async processFont(fontConfig, chars, outputDir, projectRoot) {
		const processedConfig = await processFontConfig(fontConfig, projectRoot)
		const { src, family, weight, style } = processedConfig

		const srcPath = path.isAbsolute(src) ? src : path.resolve(projectRoot, src)
		if (!fs.existsSync(srcPath)) {
			console.warn(`⚠️ 字体文件不存在: ${srcPath}`)
			return null
		}

		// 创建输出目录
		const cssDir = path.join(path.dirname(srcPath), outputDir)
		if (!fs.existsSync(cssDir)) {
			fs.mkdirSync(cssDir, { recursive: true })
		}

		// 生成字体子集
		const outputPath = path.join(cssDir, `${path.basename(src, path.extname(src))}.woff2`)
		await subsetFont({
			input: srcPath,
			output: outputPath,
			charset: Array.from(chars).join(''),
			format: 'woff2'
		})

		// 计算压缩率
		const originalSize = fs.statSync(srcPath).size
		const subsetSize = fs.statSync(outputPath).size
		const compressionRatio = ((originalSize - subsetSize) / originalSize * 100).toFixed(1)

		console.log(`🔄 处理字体: ${path.basename(src)}`)
		console.log(`   输出路径: ${path.relative(projectRoot, outputPath)}`)
		console.log(`   原始大小: ${(originalSize / 1024).toFixed(2)} KB`)
		console.log(`   子集大小: ${(subsetSize / 1024).toFixed(2)} KB`)
		console.log(`   压缩率: ${compressionRatio}%`)

		// 读取生成的字体文件
		const buffer = fs.readFileSync(outputPath)

		return {
			cssDir,
			cssEntry: {
				family,
				weight,
				style,
				relativePath: path.basename(outputPath)
			},
			buffer
		}
	}

	emitAssets(compilation) {
		for (const asset of this.generatedAssets) {
			compilation.emitAsset(asset.fileName, {
				source: () => asset.source,
				size: () => asset.source.length
			})
		}
	}

	injectCssToHtml(data) {
		const cssAssets = this.generatedAssets.filter(asset => asset.type === 'css')
		if (cssAssets.length === 0) {
			return
		}

		const cssTags = cssAssets.map(asset => 
			`<link rel="stylesheet" href="./${asset.fileName}">`
		).join('\n    ')

		// 在 </head> 前插入 CSS
		data.html = data.html.replace('</head>', `    ${cssTags}\n</head>`)
		console.log(`   自动注入 CSS 到 HTML: ${cssAssets.map(a => a.fileName).join(', ')}`)
	}
}

export default FontSubsetPlugin