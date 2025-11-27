/**
 * 字体子集化核心函数
 * 与 Vite 无关，可单独在 Node 环境下调用
 */

import fs from 'fs'
import path from 'path'
import subsetFontLib from 'subset-font'

/**
 * 子集化单个字体文件
 *
 * @param {Object} options
 * @param {string} options.input  源字体路径（绝对 / 相对 cwd 均可）
 * @param {string} options.output 目标字体输出路径（会写入磁盘）
 * @param {string | string[]} options.charset 需要保留的字符集合
 * @param {'ttf' | 'otf' | 'woff' | 'woff2'} [options.format='woff2'] 目标格式
 * @returns {Promise<{
 *   inputPath: string
 *   outputPath: string
 *   originalSize: number     // 字节数
 *   subsetSize: number       // 字节数
 *   compressionRatio: number // 0-1，压缩比例
 *   charset: string
 *   buffer: Buffer
 * }>} 子集结果和相关元数据
 */
export async function subsetFont({ input, output, charset, format = 'woff2' }) {
	if (!input || !output) {
		throw new Error('[font-subset-core] input 和 output 为必填参数')
	}

	const inputPath = path.resolve(input)
	const outputPath = path.resolve(output)

	if (!fs.existsSync(inputPath)) {
		throw new Error(`[font-subset-core] 字体文件不存在: ${inputPath}`)
	}

	const fontBuffer = fs.readFileSync(inputPath)
	const text = Array.isArray(charset) ? charset.join('') : String(charset || '')

	// 使用 subset-font 生成子集 Buffer
	const subsetBuffer = await subsetFontLib(fontBuffer, text, {
		targetFormat: format
	})

	// 确保输出目录存在
	const outputDir = path.dirname(outputPath)
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true })
	}

	// 写入子集字体文件
	fs.writeFileSync(outputPath, subsetBuffer)

	const originalSize = fontBuffer.length
	const subsetSize = subsetBuffer.length
	const compressionRatio = originalSize > 0 ? 1 - subsetSize / originalSize : 0

	return {
		inputPath,
		outputPath,
		originalSize,
		subsetSize,
		compressionRatio,
		charset: text,
		buffer: subsetBuffer
	}
}
