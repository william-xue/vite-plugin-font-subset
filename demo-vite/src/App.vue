<template>
  <div class="demo-container">
    <h1>Vite 字体子集化插件演示</h1>
    <div class="content">
      <h2>中文字符测试</h2>
      <p>这是一个测试页面，用于验证字体子集化功能。</p>
      <p>包含的字符：①②③④⑤⑥⑦⑧⑨⑩</p>
      <p>常用标点：，。！？；：""''（）【】《》、·—…</p>
      <p>英文字符：Hello World! 1234567890</p>
      
      <h3>字体信息</h3>
      <ul>
        <li>字体族：Source Han Sans CN</li>
        <li>字重：400</li>
        <li>样式：normal</li>
        <li>格式：WOFF2 (子集化后)</li>
      </ul>
      
      <h3>构建信息</h3>
      <p>当前模式：{{ isDev ? '开发模式' : '生产模式' }}</p>
      <p v-if="!isDev">生产构建时字体将自动子集化</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isDev() {
      return import.meta.env.DEV
    }
  }
}
</script>

<style scoped>
.demo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Source Han Sans CN', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.content {
  line-height: 1.6;
}

h1, h2, h3 {
  color: #333;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
}

li {
  margin: 5px 0;
}
</style>