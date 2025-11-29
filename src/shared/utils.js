/**
 * 工具函数模块 - 各适配器共用的工具函数
 */

import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

/**
 * 生成字符串的 MD5 哈希值（前8位）
 * @param {string} input 输入字符串
 * @returns {string} 哈希值
 */
export function hashString(input) {
	return crypto.createHash('md5').update(input).digest('hex').slice(0, 8)
}

/**
 * 处理单个字体配置的通用逻辑
 * @param {Object} fontConfig 字体配置
 * @param {Set<string>} chars 字符集
 * @param {string} outputDir 输出目录
 * @param {string} projectRoot 项目根目录
 * @param {Function} subsetFont 核心子集化函数
 * @returns {Promise<Object>} 处理结果
 */
export async function processFontConfig(fontConfig, chars, outputDir, projectRoot, subsetFont) {
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

	const charset = Array.from(chars).join('')

	const result = await subsetFont({
		input: srcPath,
		output: outputPath,
		charset,
		format: 'woff2'
	})

	const originalSize = (result.originalSize / 1024).toFixed(2)
	const subsetSize = (result.subsetSize / 1024).toFixed(2)
	const ratio = (result.compressionRatio * 100).toFixed(1)

	console.log(`   原始大小: ${originalSize} KB`)
	console.log(`   子集大小: ${subsetSize} KB`)
	console.log(`   压缩率: ${ratio}%`)

	const cssDir = srcDir
	const relativePath = path.relative(cssDir, result.outputPath).replace(/\\/g, '/')

	return {
		cssDir,
		buffer: result.buffer,
		cssEntry: {
			family,
			style,
			weight,
			relativePath
		}
	}
}
