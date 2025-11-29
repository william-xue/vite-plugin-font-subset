/**
 * 字符扫描模块 - 从源码文件中收集使用的字符
 * 与构建工具无关，可被各适配器复用
 */

import fs from 'fs'
import fg from 'fast-glob'

/**
 * 收集项目中的字符集
 * @param {string[]} scanDirs 扫描路径 glob 模式
 * @param {string} extraChars 额外字符
 * @param {string} rootDir 项目根目录
 * @returns {Promise<Set<string>>} 字符集合
 */
export async function collectCharacters(scanDirs, extraChars, rootDir) {
	const chars = new Set()

	// 基础字符集：英文、数字、常用符号、中文标点
	const baseChars = [
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
		"!@#$%^&*()_+-=[]{}|;:'\",.<>?/~`",
		`，。！？；：""''（）【】《》、·—…`,
		' \n\t'
	].join('')

	for (const ch of baseChars) {
		chars.add(ch)
	}

	// 添加额外字符
	if (extraChars) {
		for (const ch of extraChars) chars.add(ch)
	}

	// 扫描文件内容
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