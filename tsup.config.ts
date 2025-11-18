import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.js'],
	format: ['cjs', 'esm'],
	dts: true,
	clean: true,
	splitting: false,
	sourcemap: false,
	outDir: 'dist'
})
