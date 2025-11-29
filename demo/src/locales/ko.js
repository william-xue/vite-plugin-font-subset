export default {
  header: {
    title: '🔤 Vite Font Subset Plugin 데모',
    subtitle: '자동 폰트 서브셋 플러그인 데모'
  },
  infoCards: {
    principle: {
      icon: '📦',
      title: '원리 설명',
      description: '플러그인은 프로젝트의 모든 파일을 스캔하여 사용된 문자를 수집하고, 전체 폰트 파일을 이 문자들만 포함하는 서브셋으로 잘라내어 파일 크기를 크게 줄입니다.'
    },
    performance: {
      icon: '⚡',
      title: '성능 최적화',
      description: '빌드 시 WOFF2 형식의 폰트 서브셋을 자동으로 생성하여 HTML에 주입합니다. 개발 시 소스 디렉토리에 CSS 파일을 생성하여 디버깅을 용이하게 합니다.'
    },
    usage: {
      icon: '🎨',
      title: '사용 방법',
      description: 'vite.config.js에서 폰트 경로와 옵션을 설정하고 npm run build를 실행하여 효과를 확인하세요.'
    }
  },
  comparison: {
    title: '📊 폰트 압축 효과 비교',
    original: {
      title: '원본 폰트',
      label: '전체 폰트 파일',
      features: {
        allChars: '✅ 모든 문자 포함',
        anyText: '✅ 임의의 텍스트 지원',
        slowLoading: '❌ 로딩 속도 느림',
        highData: '❌ 데이터 소모량 큼'
      }
    },
    subset: {
      title: '서브셋 폰트',
      label: '프로젝트 문자만',
      features: {
        fastLoading: '✅ 로딩 속도 빠름',
        lowData: '✅ 데이터 소모량 적음',
        goodUx: '✅ 사용자 경험 우수',
        limitedChars: '❌ 프로젝트 문자에 한정'
      }
    },
    compression: '99.7% 압축',
    stats: {
      compression: '압축률',
      speedImprovement: '속도 향상'
    }
  },
  interactive: {
    title: '🎮 인터랙티브 문자 카운터',
    description: '중/일/한국어 문자를 입력하고 폰트 크기 변화 확인',
    placeholder: '여기에 중국어, 日本語, 한국어를 입력하세요...',
    stats: {
      charCount: '문자 수',
      estimatedSize: '예상 크기'
    },
    previewPlaceholder: '텍스트를 입력하여 효과를 확인하세요...'
  },
  instructions: {
    title: '📖 빠른 시작',
    steps: {
      install: {
        title: '의존성 설치',
        command: 'npm install'
      },
      dev: {
        title: '개발 모드',
        command: 'npm run dev',
        hint: '개발 시 src/fonts/subset 디렉토리에 폰트 서브셋과 font.css가 생성됩니다'
      },
      build: {
        title: '프로덕션 빌드',
        command: 'npm run build',
        hint: '빌드 후 폰트와 CSS가 자동으로 dist 디렉토리에 주입됩니다'
      },
      preview: {
        title: '효과 미리보기',
        command: 'npm run preview',
        hint: '브라우저에서 빌드 후 효과 확인'
      }
    }
  },
  config: {
    title: '⚙️ 설정 예제'
  },
  footer: {
    text: '확인',
    link: 'GitHub 저장소',
    more: '더 보기'
  },
  demoText: {
    korean: '본고딕 데모 텍스트 - 이것은 커스텀 폰트를 사용하는 한국어 텍스트로, 일반적인 한글 문자와 문장 부호를 포함합니다.',
    placeholder: '텍스트를 입력하여 효과를 확인하세요...'
  }
}
