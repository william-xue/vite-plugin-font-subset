export default {
  header: {
    title: '🔤 Vite Font Subset Plugin Demo',
    subtitle: '自动字体子集化插件演示'
  },
  infoCards: {
    principle: {
      icon: '📦',
      title: '原理说明',
      description: '插件会扫描项目中所有文件，收集使用的字符，然后将完整字体文件裁剪为只包含这些字符的子集，大幅减小文件体积。'
    },
    performance: {
      icon: '⚡',
      title: '性能优化',
      description: '构建时自动生成 WOFF2 格式的字体子集，并注入到 HTML 中。开发时在源目录生成 CSS 文件，方便调试。'
    },
    usage: {
      icon: '🎨',
      title: '使用方法',
      description: '在 vite.config.js 中配置字体路径和选项，运行 npm run build 即可看到效果。'
    }
  },
  comparison: {
    title: '📊 字体压缩效果对比',
    original: {
      title: '原始字体',
      label: '完整字体文件',
      features: {
        allChars: '✅ 包含所有字符',
        anyText: '✅ 支持任意文字',
        slowLoading: '❌ 加载速度慢',
        highData: '❌ 流量消耗大'
      }
    },
    subset: {
      title: '子集字体',
      label: '仅项目字符',
      features: {
        fastLoading: '✅ 加载速度快',
        lowData: '✅ 流量消耗少',
        goodUx: '✅ 用户体验佳',
        limitedChars: '❌ 仅限项目字符'
      }
    },
    compression: '99.7% 压缩',
    stats: {
      compression: '压缩率',
      speedImprovement: '速度提升'
    }
  },
  interactive: {
    title: '🎮 交互式字符计数器',
    description: '输入中/日/韩文字符，查看字体大小变化',
    placeholder: '在这里输入中文、日本語、한국어...',
    stats: {
      charCount: '字符数',
      estimatedSize: '预估大小'
    },
    previewPlaceholder: '请输入文字查看效果...'
  },
  instructions: {
    title: '📖 快速开始',
    steps: {
      install: {
        title: '安装依赖',
        command: 'npm install'
      },
      dev: {
        title: '开发模式',
        command: 'npm run dev',
        hint: '开发时会在 src/fonts/subset 目录生成字体子集和 font.css'
      },
      build: {
        title: '生产构建',
        command: 'npm run build',
        hint: '构建后字体和 CSS 会自动注入到 dist 目录'
      },
      preview: {
        title: '预览效果',
        command: 'npm run preview',
        hint: '在浏览器中查看构建后的效果'
      }
    }
  },
  config: {
    title: '⚙️ 配置示例'
  },
  footer: {
    text: '查看',
    link: 'GitHub 仓库',
    more: '了解更多'
  },
  demoText: {
    chinese: '思源黑体演示文本 - 这是一段使用自定义字体的中文文本，包含常用汉字和标点符号。',
    placeholder: '请输入文字查看效果...'
  }
}
