/**
 * vite-plugin-font-subset
 * 自动扫描项目字符集，将字体文件子集化为 WOFF2 格式
 */

import fs from 'fs'
import path from 'path'
import fg from 'fast-glob'
import subsetFont from 'subset-font'

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
	const cssFiles = new Map() // cssPath -> { content, fileName }

	return {
		name: 'vite-plugin-font-subset',

		configResolved(resolvedConfig) {
			isBuild = resolvedConfig.command === 'build'
			projectRoot = resolvedConfig.root || process.cwd()
			config = resolvedConfig
		},

		async buildStart() {
			cssFiles.clear()
			if (!enabled || !isBuild || fonts.length === 0) {
				return
			}

			console.log('\n🔤 开始字体子集化...\n')

			try {
				// 1. 收集字符集
				const chars = await collectCharacters(scanDirs, extraChars, projectRoot)
				console.log(`📊 收集到 ${chars.size} 个唯一字符`)

				// 2. 处理每个字体
				const cssGroups = new Map()
				for (const fontConfig of fonts) {
					const result = await processFont(fontConfig, chars, outputDir, projectRoot)
					if (generateCss && result) {
						const { cssDir, cssPath, cssEntry } = result
						if (!cssGroups.has(cssDir)) {
							cssGroups.set(cssDir, { cssPath, entries: [] })
						}
						cssGroups.get(cssDir).entries.push(cssEntry)
					}
				}

				// 3. 统一生成 CSS，避免多字体相互覆盖
				if (generateCss && cssGroups.size > 0) {
					for (const { cssPath, entries } of cssGroups.values()) {
						const cssContent = buildCss(entries)
						fs.writeFileSync(cssPath, cssContent)
						console.log(`   生成 CSS: ${path.relative(projectRoot, cssPath)}`)
						
						// 保存 CSS 内容用于后续注入
						const fileName = path.basename(cssPath)
						cssFiles.set(cssPath, { content: cssContent, fileName })
					}
				}

				console.log('\n✅ 字体子集化完成！\n')
			} catch (error) {
				console.error('❌ 字体子集化失败:', error)
				throw error
			}
		},

		transformIndexHtml(html) {
			if (!enabled || !isBuild || !generateCss || !injectCss || cssFiles.size === 0) {
				return
			}

			const tags = []

			// 直接将 CSS 内容作为内联样式注入，确保构建后可用
			for (const [cssPath, { content }] of cssFiles) {
				console.log(`   自动注入 CSS: ${path.relative(projectRoot, cssPath)}`)
				
				tags.push({
					tag: 'style',
					children: content,
					injectTo: 'head'
				})
			}

			if (tags.length === 0) return

			return tags
		}
	}
}

/**
 * 收集项目中使用的所有字符
 */
async function collectCharacters(scanDirs, extraChars, rootDir) {
	const chars = new Set()

	// 使用数组 join，避免引号冲突导致的语法错误
	const baseChars = [
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
		"!@#$%^&*()_+-=[]{}|;:'\",.<>?/~`",
		'，。！？；：“”‘’（）【】《》、·—…',
		' \n\t'
	].join('')

	for (const ch of baseChars) {
		chars.add(ch)
	}

	if (extraChars) {
		for (const ch of extraChars) chars.add(ch)
	}

	const files = await fg(scanDirs, { absolute: true, dot: true, cwd: rootDir })

	for (const file of files) {
		try {
			const content = fs.readFileSync(file, 'utf-8')
			for (const ch of content) chars.add(ch)
		} catch {
			// 忽略读取失败
		}
	}

	return chars
}

/**
 * 处理单个字体文件
 */
async function processFont(fontConfig, chars, outputDir, projectRoot) {
	const {
		src, // 源字体路径
		family, // 字体族名称
		weight = 400, // 字重
		style = 'normal' // 样式
	} = fontConfig

	if (!src || !family) {
		throw new Error('字体配置必须包含 src 和 family')
	}

	const srcPath = path.isAbsolute(src) ? src : path.resolve(projectRoot, src)
	if (!fs.existsSync(srcPath)) {
		throw new Error(`字体文件不存在: ${srcPath}`)
	}

	const srcDir = path.dirname(srcPath)
	const srcExt = path.extname(srcPath)
	const srcName = path.basename(srcPath, srcExt)

	const subsetDir = path.join(srcDir, outputDir)
	const outputPath = path.join(subsetDir, `${srcName}.woff2`)

	// 创建输出目录
	if (!fs.existsSync(subsetDir)) {
		fs.mkdirSync(subsetDir, { recursive: true })
	}

	console.log(`\n🔄 处理字体: ${path.basename(srcPath)}`)
	console.log(`   输出路径: ${path.relative(projectRoot, outputPath)}`)

	// 读取源字体
	const fontBuffer = fs.readFileSync(srcPath)
	const text = Array.from(chars).join('')

	// 生成子集
	const subsetBuffer = await subsetFont(fontBuffer, text, {
		targetFormat: 'woff2'
	})

	// 写入文件
	fs.writeFileSync(outputPath, subsetBuffer)

	const originalSize = (fontBuffer.length / 1024).toFixed(2)
	const subsetSize = (subsetBuffer.length / 1024).toFixed(2)
	const ratio = ((1 - subsetBuffer.length / fontBuffer.length) * 100).toFixed(1)

	console.log(`   原始大小: ${originalSize} KB`)
	console.log(`   子集大小: ${subsetSize} KB`)
	console.log(`   压缩率: ${ratio}%`)

	const cssDir = srcDir
	const cssPath = path.join(cssDir, 'font.css')
	const relativePath = path.relative(cssDir, outputPath).replace(/\\/g, '/')

	return {
		cssDir,
		cssPath,
		cssEntry: {
			family,
			style,
			weight,
			relativePath
		}
	}
}

/**
 * 生成 font.css 内容，按 family/weight/ style 保证稳定顺序
 */
function buildCss(entries) {
	const header = '/* 此文件由 vite-plugin-font-subset 自动生成，请勿手动修改 */'
	const ordered = [...entries].sort((a, b) => {
		if (a.family !== b.family) return a.family.localeCompare(b.family, 'zh-Hans')
		if (a.weight !== b.weight) return a.weight - b.weight
		return a.style.localeCompare(b.style, 'zh-Hans')
	})

	const body = ordered
		.map(({ family, style, weight, relativePath }) => `@font-face {
  font-family: '${family}';
  font-style: ${style};
  font-weight: ${weight};
  font-display: swap;
  src: url('./${relativePath}') format('woff2');
}`)
		.join('\n\n')

	return `${header}\n${body}\n`
}
