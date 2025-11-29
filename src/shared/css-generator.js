/**
 * CSS 生成模块 - 生成 @font-face 规则
 * 与构建工具无关，可被各适配器复用
 */

/**
 * 生成构建产物中的 CSS 内容（用于资源发射）
 * @param {Array<{family:string, style:string, weight:number, relativePath:string}>} entries
 * @returns {string} CSS 内容
 */
export function buildCssForBundle(entries) {
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

/**
 * 生成开发用 font.css 内容（用于源目录）
 * @param {Array<{family:string, style:string, weight:number, relativePath:string}>} entries
 * @returns {string} CSS 内容
 */
export function buildCss(entries) {
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
