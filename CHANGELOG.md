# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-29

### 🚀 Major Features
- **Multi-Tool Support**: Added support for Webpack, Rollup, and Rspack build tools
- **New Subpath Exports**: Enable importing specific adapters:
  - `@fe-fast/vite-plugin-font-subset/webpack` - Webpack adapter
  - `@fe-fast/vite-plugin-font-subset/rollup` - Rollup adapter  
  - `@fe-fast/vite-plugin-font-subset/vite` - Vite adapter (explicit)
- **Rspack Compatibility**: Webpack adapter works seamlessly with Rspack

### ✨ Improvements
- **Webpack Adapter**: Fixed deprecation warning by migrating from `emit` hook to `processAssets`
- **Enhanced Peer Dependencies**: Added optional peer dependencies for all supported build tools
- **Improved Keywords**: Added webpack, rollup, rspack keywords for better discoverability
- **Updated Documentation**: Comprehensive usage examples for all build tools

### 🛠️ Technical Changes
- **Multi-Entry Build**: Updated tsup config to build multiple adapter entry points
- **Package Exports**: Configured subpath exports in package.json for modular imports
- **Runtime Compatibility**: Removed static Compilation import for better ESM compatibility

### ✅ Zero Breaking Changes
- **Backward Compatible**: Existing Vite users can continue using default import without any changes
- **Default Export Unchanged**: `@fe-fast/vite-plugin-font-subset` still works as before for Vite projects

### 📦 Examples
```js
// Vite (unchanged)
import fontSubsetPlugin from '@fe-fast/vite-plugin-font-subset'

// Webpack (new)
import FontSubsetPlugin from '@fe-fast/vite-plugin-font-subset/webpack'

// Rollup (new)  
import fontSubsetPlugin from '@fe-fast/vite-plugin-font-subset/rollup'

// Rspack (new, uses webpack adapter)
import FontSubsetPlugin from '@fe-fast/vite-plugin-font-subset/webpack'
```

## [0.3.4] - Previous Versions
- Vite-only font subsetting plugin
- Basic character scanning and font processing
- CSS generation and injection features

---

## Migration Guide

### For Existing Vite Users
No action required! Your existing configuration will continue to work exactly as before.

### For New Webpack/Rollup/Rspack Users
Use the new subpath exports to import the appropriate adapter for your build tool. See the examples above or the updated README.md for detailed configuration instructions.
