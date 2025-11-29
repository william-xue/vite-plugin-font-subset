import { createI18n } from 'vue-i18n'
import ja from './locales/ja.js'
import ko from './locales/ko.js'
import zhCN from './locales/zh-CN.js'

// 获取浏览器语言或从 localStorage 读取
const getLocale = () => {
  // 优先从 localStorage 读取用户选择
  const saved = localStorage.getItem('locale')
  if (saved && ['zh-CN', 'ja', 'ko'].includes(saved)) {
    return saved
  }
  
  // 自动检测浏览器语言
  const browserLang = navigator.language || navigator.userLanguage
  if (browserLang.startsWith('zh')) return 'zh-CN'
  if (browserLang.startsWith('ja')) return 'ja'
  if (browserLang.startsWith('ko')) return 'ko'
  
  // 默认中文
  return 'zh-CN'
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getLocale(),
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'ja': ja,
    'ko': ko
  }
})

// 导出切换语言的函数
export const setLocale = (locale) => {
  if (['zh-CN', 'ja', 'ko'].includes(locale)) {
    localStorage.setItem('locale', locale)
    i18n.global.locale.value = locale
  }
}

export default i18n
