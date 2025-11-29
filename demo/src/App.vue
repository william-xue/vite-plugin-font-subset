<template>
  <div class="demo-container">
    <!-- 语言切换器 -->
    <div class="language-switcher">
      <button 
        @click="changeLanguage('zh-CN')" 
        :class="{ active: currentLocale === 'zh-CN' }"
        title="中文"
      >
        🇨🇳
      </button>
      <button 
        @click="changeLanguage('ja')" 
        :class="{ active: currentLocale === 'ja' }"
        title="日本語"
      >
        🇯🇵
      </button>
      <button 
        @click="changeLanguage('ko')" 
        :class="{ active: currentLocale === 'ko' }"
        title="한국어"
      >
        🇰🇷
      </button>
    </div>

    <header class="header">
      <h1>{{ $t('header.title') }}</h1>
      <p class="subtitle">{{ $t('header.subtitle') }}</p>
    </header>

    <div class="info-cards">
      <div class="card">
        <div class="card-icon">{{ $t('infoCards.principle.icon') }}</div>
        <h3>{{ $t('infoCards.principle.title') }}</h3>
        <p>{{ $t('infoCards.principle.description') }}</p>
      </div>

      <div class="card">
        <div class="card-icon">{{ $t('infoCards.performance.icon') }}</div>
        <h3>{{ $t('infoCards.performance.title') }}</h3>
        <p>{{ $t('infoCards.performance.description') }}</p>
      </div>

      <div class="card">
        <div class="card-icon">{{ $t('infoCards.usage.icon') }}</div>
        <h3>{{ $t('infoCards.usage.title') }}</h3>
        <p>{{ $t('infoCards.usage.description') }}</p>
      </div>
    </div>

    <div class="font-comparison">
      <h2>{{ $t('comparison.title') }}</h2>
      <div class="comparison-cards">
        <div class="comparison-card original">
          <div class="card-header">
            <span class="icon">📦</span>
            <h3>{{ $t('comparison.original.title') }}</h3>
          </div>
          <div class="size-display">
            <div class="size-value">10.2 MB</div>
            <div class="size-label">{{ $t('comparison.original.label') }}</div>
          </div>
          <div class="features">
            <div class="feature">{{ $t('comparison.original.features.allChars') }}</div>
            <div class="feature">{{ $t('comparison.original.features.anyText') }}</div>
            <div class="feature negative">{{ $t('comparison.original.features.slowLoading') }}</div>
            <div class="feature negative">{{ $t('comparison.original.features.highData') }}</div>
          </div>
        </div>

        <div class="arrow-container">
          <div class="arrow">→</div>
          <div class="compression-badge">{{ $t('comparison.compression') }}</div>
        </div>

        <div class="comparison-card subset">
          <div class="card-header">
            <span class="icon">⚡</span>
            <h3>{{ $t('comparison.subset.title') }}</h3>
          </div>
          <div class="size-display">
            <div class="size-value">{{ subsetSize }}</div>
            <div class="size-label">{{ $t('comparison.subset.label') }}</div>
          </div>
          <div class="features">
            <div class="feature">{{ $t('comparison.subset.features.fastLoading') }}</div>
            <div class="feature">{{ $t('comparison.subset.features.lowData') }}</div>
            <div class="feature">{{ $t('comparison.subset.features.goodUx') }}</div>
            <div class="feature negative">{{ $t('comparison.subset.features.limitedChars') }}</div>
          </div>
        </div>
      </div>

      <div class="progress-section">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: compressionPercentage + '%' }"></div>
        </div>
        <div class="progress-stats">
          <span>{{ $t('comparison.stats.compression') }}: {{ compressionPercentage }}%</span>
          <span>{{ $t('comparison.stats.speedImprovement') }}: {{ speedImprovement }}x</span>
        </div>
      </div>
    </div>

    <div class="interactive-demo">
      <h2>{{ $t('interactive.title') }}</h2>
      <p class="demo-description">{{ $t('interactive.description') }}</p>
      
      <div class="input-section">
        <textarea 
          v-model="userText" 
          :placeholder="$t('interactive.placeholder')"
          class="text-input"
          @input="updateCharCount"
        ></textarea>
        <div class="char-stats">
          <span class="char-count">{{ $t('interactive.stats.charCount') }}: {{ uniqueChars.length }}</span>
          <span class="estimated-size">{{ $t('interactive.stats.estimatedSize') }}: {{ estimatedSize }}</span>
        </div>
      </div>

      <div class="preview-section">
        <div class="preview-text custom-font">
          {{ userText || $t('interactive.previewPlaceholder') }}
        </div>
      </div>
    </div>

    <div class="instructions">
      <h2>{{ $t('instructions.title') }}</h2>
      <div class="steps">
        <div class="step">
          <span class="step-number">1</span>
          <div class="step-content">
            <h4>{{ $t('instructions.steps.install.title') }}</h4>
            <code>{{ $t('instructions.steps.install.command') }}</code>
          </div>
        </div>
        <div class="step">
          <span class="step-number">2</span>
          <div class="step-content">
            <h4>{{ $t('instructions.steps.dev.title') }}</h4>
            <code>{{ $t('instructions.steps.dev.command') }}</code>
            <p class="hint">{{ $t('instructions.steps.dev.hint') }}</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">3</span>
          <div class="step-content">
            <h4>{{ $t('instructions.steps.build.title') }}</h4>
            <code>{{ $t('instructions.steps.build.command') }}</code>
            <p class="hint">{{ $t('instructions.steps.build.hint') }}</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">4</span>
          <div class="step-content">
            <h4>{{ $t('instructions.steps.preview.title') }}</h4>
            <code>{{ $t('instructions.steps.preview.command') }}</code>
            <p class="hint">{{ $t('instructions.steps.preview.hint') }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="config-example">
      <h2>{{ $t('config.title') }}</h2>
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
        {{ $t('footer.text') }}
        <a href="https://github.com/william-xue/vite-plugin-font-subset" target="_blank">
          {{ $t('footer.link') }}
        </a>
        {{ $t('footer.more') }}
      </p>
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from './i18n.js'

const { t, locale } = useI18n()

// 响应式数据
const currentLocale = ref(locale.value)
const userText = ref('')
const subsetSize = ref('28.5 KB')
const actualSubsetSize = ref(28.5) // KB

// 根据当前语言设置初始演示文本
const setInitialDemoText = () => {
  const demoTexts = {
    'zh-CN': '思源黑体演示文本 - 这是一段使用自定义字体的中文文本，包含常用汉字和标点符号。',
    'ja': '源ノ角ゴシックデモテキスト - これはカスタムフォントを使用した日本語テキストで、ひらがな、カタカナ、漢字を含んでいます。',
    'ko': '본고딕 데모 텍스트 - 이것은 커스텀 폰트를 사용하는 한국어 텍스트로, 일반적인 한글 문자와 문장 부호를 포함합니다.'
  }
  userText.value = demoTexts[currentLocale.value] || demoTexts['zh-CN']
}

// 计算属性
const uniqueChars = computed(() => {
  return [...new Set(userText.value)]
})

const estimatedSize = computed(() => {
  // 基于字符数估算字体大小（简化算法）
  const charCount = uniqueChars.value.length
  const estimatedKB = (charCount * 0.8).toFixed(1) // 每字符约0.8KB
  return `${estimatedKB} KB`
})

const compressionPercentage = computed(() => {
  const originalMB = 10.2
  const originalKB = originalMB * 1024
  const percentage = ((originalKB - actualSubsetSize.value) / originalKB * 100).toFixed(1)
  return percentage
})

const speedImprovement = computed(() => {
  const originalMB = 10.2
  const subsetMB = actualSubsetSize.value / 1024
  const improvement = (originalMB / subsetMB).toFixed(0)
  return improvement
})

// 方法
const updateCharCount = () => {
  // 根据字符数动态更新预估大小
  const charCount = uniqueChars.value.length
  actualSubsetSize.value = Math.max(charCount * 0.8, 5) // 最小5KB
  subsetSize.value = `${actualSubsetSize.value.toFixed(1)} KB`
}

const changeLanguage = (newLocale) => {
  setLocale(newLocale)
  currentLocale.value = newLocale
  setInitialDemoText()
  updateCharCount()
}

// 获取实际字体文件大小
const fetchActualFontSize = async () => {
  try {
    // 尝试获取构建后的字体文件大小
    const response = await fetch('/vite-plugin-font-subset/assets/fonts/font-f94bc27a.woff2')
    if (response.ok) {
      const contentLength = response.headers.get('content-length')
      if (contentLength) {
        const sizeKB = (parseInt(contentLength) / 1024).toFixed(1)
        actualSubsetSize.value = parseFloat(sizeKB)
        subsetSize.value = `${sizeKB} KB`
      }
    }
  } catch (error) {
    console.log('使用默认字体大小')
    // 保持默认值
  }
}

onMounted(() => {
  console.log('🔤 Font Subset Plugin Demo 已加载')
  console.log('💡 提示：运行 npm run build 查看字体子集化效果')
  
  // 获取实际字体大小
  fetchActualFontSize()
  
  // 初始化字符计数
  setInitialDemoText()
  updateCharCount()
})
</script>

<style scoped>
.demo-container {
  color: white;
}

/* 语言切换器样式 */
.language-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 8px;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.3);
  padding: 8px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.language-switcher button {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.language-switcher button:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
}

.language-switcher button.active {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
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

/* 新增的字体对比组件样式 */
.font-comparison {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 60px;
  animation: fadeInUp 0.6s ease-out 0.4s backwards;
}

.font-comparison h2 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2rem;
}

.comparison-cards {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 30px;
  align-items: center;
  margin-bottom: 40px;
}

.comparison-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
}

.comparison-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.comparison-card.original {
  border-color: rgba(255, 107, 107, 0.5);
  background: rgba(255, 107, 107, 0.1);
}

.comparison-card.subset {
  border-color: rgba(76, 175, 80, 0.5);
  background: rgba(76, 175, 80, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
}

.card-header .icon {
  font-size: 2.5rem;
}

.card-header h3 {
  font-size: 1.5rem;
  margin: 0;
}

.size-display {
  text-align: center;
  margin-bottom: 25px;
}

.size-value {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.original .size-value {
  color: #ff6b6b;
}

.subset .size-value {
  color: #4caf50;
}

.size-label {
  font-size: 1rem;
  opacity: 0.8;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature {
  font-size: 0.9rem;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
}

.feature.negative {
  background: rgba(255, 107, 107, 0.2);
  color: #ff6b6b;
}

.arrow-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.arrow {
  font-size: 3rem;
  font-weight: bold;
  color: #667eea;
}

.compression-badge {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 0.9rem;
  white-space: nowrap;
  animation: pulse 2s infinite;
}

.progress-section {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 25px;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 15px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #667eea, #764ba2);
  border-radius: 10px;
  transition: width 1s ease-out;
  animation: shimmer 2s infinite;
}

.progress-stats {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
}

/* 交互式演示样式 */
.interactive-demo {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 60px;
  color: #333;
  animation: fadeInUp 0.6s ease-out 0.6s backwards;
}

.interactive-demo h2 {
  color: #667eea;
  text-align: center;
  margin-bottom: 15px;
}

.demo-description {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}

.input-section {
  margin-bottom: 30px;
}

.text-input {
  width: 100%;
  height: 120px;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  padding: 20px;
  font-size: 1.1rem;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.3s;
}

.text-input:focus {
  outline: none;
  border-color: #667eea;
}

.char-stats {
  display: flex;
  gap: 30px;
  margin-top: 15px;
  font-size: 1rem;
  color: #666;
}

.char-count, .estimated-size {
  background: #f5f5f5;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
}

.preview-section {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
}

.preview-text {
  font-size: 1.8rem;
  line-height: 1.6;
  color: #333;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 动画效果 */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
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

  /* 语言切换器移动端适配 */
  .language-switcher {
    top: 15px;
    right: 15px;
    padding: 6px;
    gap: 6px;
  }

  .language-switcher button {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  /* 字体对比组件移动端适配 */
  .comparison-cards {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .arrow-container {
    order: -1;
  }

  .arrow {
    transform: rotate(90deg);
  }

  .compression-badge {
    font-size: 0.8rem;
    padding: 8px 16px;
  }

  .size-value {
    font-size: 2rem;
  }

  .card-header .icon {
    font-size: 2rem;
  }

  .char-stats {
    flex-direction: column;
    gap: 15px;
  }

  .text-input {
    height: 100px;
    font-size: 1rem;
  }

  .preview-text {
    font-size: 1.4rem;
  }

  .progress-stats {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
}
</style>
