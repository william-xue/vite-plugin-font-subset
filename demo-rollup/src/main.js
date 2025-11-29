// 简化的 main.js 用于 Rollup 字体子集化验证
console.log('Rollup Font Subset Plugin Demo Loaded');

// 添加一些中文字符用于扫描和子集化
const demoText = `这是一个测试页面，用于验证字体子集化功能。包含的字符：①②③④⑤⑥⑦⑧⑨⑩常用标点：，。！？；：""''（）【】《》、·—…英文字符：Hello World! 1234567890`;

console.log('Demo text:', demoText);

// 简单的页面初始化
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, font subset plugin should have processed fonts');
});