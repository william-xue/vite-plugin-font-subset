<template>
  <div class="demo-container">
    <header class="header">
      <h1>🔤 Vite Font Subset Plugin Demo</h1>
      <p class="subtitle">自动字体子集化插件演示</p>
    </header>

    <div class="info-cards">
      <div class="card">
        <div class="card-icon">📦</div>
        <h3>原理说明</h3>
        <p>插件会扫描项目中所有文件，收集使用的字符，然后将完整字体文件裁剪为只包含这些字符的子集，大幅减小文件体积。</p>
      </div>

      <div class="card">
        <div class="card-icon">⚡</div>
        <h3>性能优化</h3>
        <p>构建时自动生成 WOFF2 格式的字体子集，并注入到 HTML 中。开发时在源目录生成 CSS 文件，方便调试。</p>
      </div>

      <div class="card">
        <div class="card-icon">🎨</div>
        <h3>使用方法</h3>
        <p>在 vite.config.js 中配置字体路径和选项，运行 <code>npm run build</code> 即可看到效果。</p>
      </div>
    </div>

    <div class="font-demo">
      <h2>字体效果展示</h2>
      <div class="demo-text custom-font">
        <p class="large">思源黑体演示文本</p>
        <p class="medium">这是一段使用自定义字体的中文文本</p>
        <p class="small">abcdefghijklmnopqrstuvwxyz 0123456789</p>
        <p class="small">ABCDEFGHIJKLMNOPQRSTUVWXYZ !@#$%^&*()</p>
      </div>
    </div>

    <div class="instructions">
      <h2>📖 快速开始</h2>
      <div class="steps">
        <div class="step">
          <span class="step-number">1</span>
          <div class="step-content">
            <h4>安装依赖</h4>
            <code>npm install</code>
          </div>
        </div>
        <div class="step">
          <span class="step-number">2</span>
          <div class="step-content">
            <h4>开发模式</h4>
            <code>npm run dev</code>
            <p class="hint">开发时会在 src/fonts/subset 目录生成字体子集和 font.css</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">3</span>
          <div class="step-content">
            <h4>生产构建</h4>
            <code>npm run build</code>
            <p class="hint">构建后字体和 CSS 会自动注入到 dist 目录</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">4</span>
          <div class="step-content">
            <h4>预览效果</h4>
            <code>npm run preview</code>
            <p class="hint">在浏览器中查看构建后的效果</p>
          </div>
        </div>
      </div>
    </div>

    <div class="config-example">
      <h2>⚙️ 配置示例</h2>
      <pre><code>fontSubsetPlugin({
  fonts: [
    {
      src: 'src/fonts/SourceHanSansCN-Regular.otf',
      family: 'Source Han Sans CN',
      weight: 400,
      style: 'normal'
    }
  ],
  scanDirs: ['src/**/*.{vue,js,ts,jsx,tsx,html}'],
  generateCss: true,
  injectCss: true
})</code></pre>
    </div>

    <footer class="footer">
      <p>
        查看
        <a href="https://github.com/william-xue/vite-plugin-font-subset" target="_blank">
          GitHub 仓库
        </a>
        了解更多
      </p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('🔤 Font Subset Plugin Demo 已加载')
  console.log('💡 提示：运行 npm run build 查看字体子集化效果')
})
</script>

<style scoped>
.demo-container {
  color: white;
}

.header {
  text-align: center;
  margin-bottom: 60px;
  animation: fadeInDown 0.6s ease-out;
}

.header h1 {
  font-size: 3rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
  animation: fadeInUp 0.6s ease-out 0.2s backwards;
}

.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.card p {
  line-height: 1.6;
  opacity: 0.9;
}

.font-demo {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 60px;
  animation: fadeInUp 0.6s ease-out 0.4s backwards;
}

.font-demo h2 {
  color: #667eea;
  margin-bottom: 30px;
  text-align: center;
}

.demo-text {
  text-align: center;
}

.custom-font {
  font-family: 'Source Han Sans CN', sans-serif;
  color: #333;
}

.large {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #667eea;
}

.medium {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #764ba2;
}

.small {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #666;
}

.instructions {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 40px;
  animation: fadeInUp 0.6s ease-out 0.6s backwards;
}

.instructions h2 {
  margin-bottom: 30px;
  text-align: center;
}

.steps {
  display: grid;
  gap: 20px;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 15px;
  border-left: 4px solid rgba(255, 255, 255, 0.3);
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h4 {
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.step-content code {
  display: inline-block;
  background: rgba(0, 0, 0, 0.3);
  padding: 8px 16px;
  border-radius: 8px;
  font-family: 'Monaco', 'Courier New', monospace;
  margin: 10px 0;
}

.hint {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 8px;
}

.config-example {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 40px;
  animation: fadeInUp 0.6s ease-out 0.8s backwards;
}

.config-example h2 {
  margin-bottom: 20px;
  text-align: center;
}

.config-example pre {
  background: rgba(0, 0, 0, 0.3);
  padding: 25px;
  border-radius: 15px;
  overflow-x: auto;
}

.config-example code {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #fff;
}

.footer {
  text-align: center;
  padding: 30px;
  opacity: 0.8;
  animation: fadeIn 0.6s ease-out 1s backwards;
}

.footer a {
  color: white;
  text-decoration: underline;
  font-weight: bold;
  transition: opacity 0.3s;
}

.footer a:hover {
  opacity: 0.7;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .info-cards {
    grid-template-columns: 1fr;
  }

  .large {
    font-size: 2rem;
  }

  .medium {
    font-size: 1.3rem;
  }
}
</style>
