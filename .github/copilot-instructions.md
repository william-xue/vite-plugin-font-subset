# Copilot Instructions for vite-plugin-font-subset

## Project Overview

This is a Vite plugin that automatically scans project files to collect character usage, then generates optimized WOFF2 font subsets containing only the characters actually used in the codebase. This dramatically reduces font file sizes (typically 70-90% compression).

**Core Architecture:**
- `src/index.js` - Single-file plugin implementation with 5 main phases:
  1. Character collection via `collectCharacters()` - scans source files using fast-glob
  2. Font processing via `processFont()` - generates WOFF2 subsets using subset-font library
  3. CSS generation via `buildCss()` - creates @font-face declarations
  4. Vite plugin lifecycle integration - hooks into `buildStart` phase
  5. Auto CSS injection via `transformIndexHtml()` - injects generated CSS into HTML during build

## Key Technical Patterns

### Plugin Lifecycle
- Plugin only runs during **production builds** (`isBuild` check in `buildStart`)
- Use `configResolved()` hook to capture build context, project root, and base URL
- Processing happens in two phases:
  1. `buildStart()` - character scanning, font subsetting, CSS file generation
  2. `transformIndexHtml()` - auto-inject generated CSS into HTML (if `injectCss: true`)
- Tracks generated CSS files in `cssFiles` Set for injection phase

### Character Collection Strategy
```javascript
// Always includes base character set: A-Z, a-z, 0-9, common punctuation, Chinese punctuation, whitespace
// Then scans: src/**/*.{vue,js,ts,jsx,tsx,json,scss,less,css} by default
// Combines with extraChars option for manual additions
```

### Font Configuration Structure
Each font in `fonts` array requires:
- `src` (required) - source font file path (absolute or relative to project root)
- `family` (required) - CSS font-family name for @font-face
- `weight` (optional, default: 400) - font-weight value
- `style` (optional, default: 'normal') - font-style value

Output structure: `[font-dir]/subset/[font-name].woff2`

### CSS Auto-Injection (New Feature)
- When `injectCss: true` (default), plugin automatically injects `<link>` tags into HTML
- Uses `transformIndexHtml()` hook to add tags with `injectTo: 'head'`
- Builds href using `base` config (respects `vite.config.js` base path)
- Safety check: skips injection if CSS path is outside project root (prevents broken paths)
- Manual import still possible if `injectCss: false` - maintains backwards compatibility

### CSS Generation Logic
- Groups fonts by source directory to avoid file conflicts
- Orders @font-face rules by: family → weight → style (stable sort for git diffs)
- Single `font.css` per directory with header comment warning against manual edits
- Uses relative paths (`./subset/*.woff2`) for portability

## Development Workflows

### Local Development
```bash
pnpm i                    # Install dependencies
# No dev/test commands - plugin is tested via integration in host projects
```

### Testing Changes
1. Make changes to `src/index.js`
2. Link to a Vite project: `pnpm link --global` (in plugin dir), then `pnpm link --global vite-plugin-font-subset` (in test project)
3. Add plugin to `vite.config.js` in test project
4. Run `pnpm build` in test project to trigger plugin
5. Verify subset fonts in output and check console logs

### Publishing
```bash
npm version patch|minor|major
npm publish
```

## Code Conventions

### Error Handling
- File read errors during character scanning are **silently ignored** (catch block with no logging)
- Font processing errors bubble up and halt the build with console.error + throw
- Validation: src/family are required; throws descriptive errors if missing or file not found

### Logging Style
- Chinese UI messages with emoji prefixes: 🔤 🔄 📊 ✅ ❌
- Shows compression metrics: original size, subset size, compression ratio
- Uses relative paths in logs (via `path.relative(projectRoot, ...)`) for readability

### Path Handling
- Always normalize paths with `path.resolve()` and `path.isAbsolute()` checks
- Convert Windows backslashes to forward slashes in CSS URLs and href (`.replace(/\\/g, '/')`)
- Store `projectRoot` and `base` from Vite config for consistent relative path calculations
- Injection paths: combine `base` + relative path from project root
- Normalize base URL by ensuring trailing slash before concatenation

## Dependencies

- **subset-font** (^2.4.0) - Core font subsetting engine (produces WOFF2 buffers)
- **fast-glob** (^3.3.3) - Efficient file scanning with glob patterns
- Peer dependency: **vite** (^4.0.0 || ^5.0.0)

## Common Pitfalls

1. **Plugin doesn't run in dev mode** - By design; only runs in production builds (`vite build`)
2. **CSS overwrites** - Fixed by grouping fonts by directory; each directory gets one `font.css`
3. **Missing characters** - Add to `extraChars` option; base set covers Latin/numbers/common punctuation but may miss specialized symbols
4. **Path issues on Windows** - Always use `path.join()` and replace backslashes in CSS URLs and href paths
5. **CSS not injected** - Check if `injectCss` is enabled (default: true); verify font CSS is within project root
6. **Wrong base path** - Plugin respects Vite's `base` config; injection paths are automatically prefixed

## Example Usage

```javascript
// vite.config.js
import fontSubset from 'vite-plugin-font-subset'

export default {
  plugins: [
    fontSubset({
      fonts: [
        { src: 'src/assets/fonts/MyFont-Regular.ttf', family: 'MyFont', weight: 400 },
        { src: 'src/assets/fonts/MyFont-Bold.ttf', family: 'MyFont', weight: 700 }
      ],
      scanDirs: ['src/**/*.{vue,jsx}'],
      outputDir: 'subset',
      generateCss: true,
      injectCss: true,  // Auto-inject into HTML (default: true)
      extraChars: '™®©'
    })
  ]
}
```

**Auto-injection result in HTML:**
```html
<head>
  <!-- Plugin automatically adds: -->
  <link rel="stylesheet" href="/src/assets/fonts/font.css" />
</head>
```
