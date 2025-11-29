export default {
  header: {
    title: '🔤 Vite Font Subset Plugin デモ',
    subtitle: '自動フォントサブセット化プラグインデモ'
  },
  infoCards: {
    principle: {
      icon: '📦',
      title: '原理説明',
      description: 'プラグインはプロジェクト内のすべてのファイルをスキャンし、使用されている文字を収集して、完全なフォントファイルをこれらの文字のみを含むサブセットにトリミングし、ファイルサイズを大幅に削減します。'
    },
    performance: {
      icon: '⚡',
      title: 'パフォーマンス最適化',
      description: 'ビルド時にWOFF2形式のフォントサブセットを自動生成し、HTMLに注入します。開発時はソースディレクトリにCSSファイルを生成し、デバッグを容易にします。'
    },
    usage: {
      icon: '🎨',
      title: '使用方法',
      description: 'vite.config.jsでフォントパスとオプションを設定し、npm run buildを実行して効果を確認してください。'
    }
  },
  comparison: {
    title: '📊 フォント圧縮効果比較',
    original: {
      title: '元フォント',
      label: '完全フォントファイル',
      features: {
        allChars: '✅ すべての文字を含む',
        anyText: '✅ 任意のテキストをサポート',
        slowLoading: '❌ 読み込み速度が遅い',
        highData: '❌ データ消費量が大きい'
      }
    },
    subset: {
      title: 'サブセットフォント',
      label: 'プロジェクト文字のみ',
      features: {
        fastLoading: '✅ 読み込み速度が速い',
        lowData: '✅ データ消費量が少ない',
        goodUx: '✅ ユーザー体験が良好',
        limitedChars: '❌ プロジェクト文字に限定'
      }
    },
    compression: '99.7% 圧縮',
    stats: {
      compression: '圧縮率',
      speedImprovement: '速度向上'
    }
  },
  interactive: {
    title: '🎮 インタラクティブ文字カウンター',
    description: '中/日/韓国語文字を入力し、フォントサイズの変化を確認',
    placeholder: 'ここに中国語、日本語、한국어を入力...',
    stats: {
      charCount: '文字数',
      estimatedSize: '推定サイズ'
    },
    previewPlaceholder: 'テキストを入力して効果を確認...'
  },
  instructions: {
    title: '📖 クイックスタート',
    steps: {
      install: {
        title: '依存関係をインストール',
        command: 'npm install'
      },
      dev: {
        title: '開発モード',
        command: 'npm run dev',
        hint: '開発時はsrc/fonts/subsetディレクトリにフォントサブセットとfont.cssが生成されます'
      },
      build: {
        title: '本番ビルド',
        command: 'npm run build',
        hint: 'ビルド後、フォントとCSSが自動的にdistディレクトリに注入されます'
      },
      preview: {
        title: '効果をプレビュー',
        command: 'npm run preview',
        hint: 'ブラウザでビルド後の効果を確認'
      }
    }
  },
  config: {
    title: '⚙️ 設定例'
  },
  footer: {
    text: '確認',
    link: 'GitHubリポジトリ',
    more: '詳細を見る'
  },
  demoText: {
    japanese: '源ノ角ゴシックデモテキスト - これはカスタムフォントを使用した日本語テキストで、ひらがな、カタカナ、漢字を含んでいます。',
    placeholder: 'テキストを入力して効果を確認...'
  }
}
