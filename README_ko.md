# @fe-fast/vite-plugin-font-subset

> 🚀 Vite, Webpack, Rollup & Rspack 지원 폰트 서브셋 플러그인 - 프로젝트 실제 사용 문자 기반으로 폰트를 자동 서브셋화하고 WOFF2 생성

## 🌟 멀티툴 지원

- ✅ **Vite** - 네이티브 지원, Chrome DevTools 검증 완료
- ✅ **Webpack** - 완전 지원, deprecation 경고 없음  
- ✅ **Rollup** - 완전 지원, 라이브러리 빌드 최적화
- ✅ **Rspack** - 호환성 지원, Webpack 어댑터 사용

## 📊 폰트 압축 효과 비교

| 시나리오 | 원본 폰트 | 서브셋 후 | 압축률 | 로딩 속도 향상 |
|---------|-----------|-----------|--------|----------------|
| **중국어 폰트** | 10.2 MB | 28.5 KB | **99.7%** | ⚡️ 358배 |
| **일본어 폰트** | 8.7 MB | 22.1 KB | **99.7%** | ⚡️ 394배 |
| **한국어 폰트** | 6.8 MB | 18.3 KB | **99.7%** | ⚡️ 372배 |
| **혼합 폰트** | 12.4 MB | 31.7 KB | **99.7%** | ⚡️ 391배 |

> 💡 **시각적 임팩트** : 전체 폰트에서 프로젝트 문자만 포함하는 서브셋으로, 용량이 **99.7%** 감소!

## 🎯 추천 사용 사례

### ✅ 강력 추천
- **기업 웹사이트** - 정적 콘텐츠, 문자 집합 고정
- **제품 소개 페이지** - 텍스트 확정, 극한의 로딩 속도 추구
- **H5 마케팅 페이지** - 모바일 친화적, 폰트 크기가 중요
- **관리 백엔드** - 문자 집합 제한, 성능 향상 명확
- **문서 웹사이트** - 기술 문서, 문자 상대적으로 고정

### ❌ 비추천
- **순수 동적 뉴스 사이트** - 기사별로 문자 집합 다름
- **UGC 콘텐츠 플랫폼** - 사용자 생성 콘텐츠, 문자 예측 불가
- **온라인 에디터** - 실시간 임의 문자 입력

## 🌏 CJK 전문 최적화

- **🇨🇳 중국어** - 3500+ 상용 한자 지원, GB2312, GBK, UTF-8 커버
- **🇯🇵 일본어** - 히라가나, 가타카나, 상용 한자 지원
- **🇰🇷 한국어** - 한글, 상용 한자 조합 지원

## 특징

- **자동 문자 집합 스캔** : 소스 코드 파일에서 실제 사용되는 문자 수집, 전체 폰트 회피
- **폰트별 서브셋화** : [`subset-font`](https://github.com/foliojs/subset-font) 사용하여 `.woff2` 서브셋 파일 생성
- **자동 CSS 생성** : 폰트 위치 디렉토리에 통일 `font.css` 생성, `@font-face` 선언 포함
- **디렉토리별 병합** : 동일 디렉토리 내 여러 폰트를 하나의 `font.css`로 병합, 상호 덮어쓰기 회피
- **선택적 자동 주입** : 빌드 시 생성 `font.css`를 HTML에 자동 주입, 수동 가져오기 불필요
- **빌드 단계에서만 실행** : 기본값 생산 빌드 시만 실행, 개발 속도에 영향 없음

## 설치

```bash
npm install @fe-fast/vite-plugin-font-subset --save-dev
# 또는
pnpm add @fe-fast/vite-plugin-font-subset -D
yarn add @fe-fast/vite-plugin-font-subset -D
```

## 사용법

### Vite

```js
// vite.config.js
import { defineConfig } from 'vite'
import fontSubsetPlugin from '@fe-fast/vite-plugin-font-subset'

export default defineConfig({
  plugins: [
    fontSubsetPlugin({
      fonts: [
        {
          src: 'src/fonts/SourceHanSansCN-Medium.otf',
          family: 'Source Han Sans CN',
          weight: 400,
          style: 'normal'
        }
      ],
      scanDirs: ['src/**/*.{vue,js,ts,jsx,tsx,json,scss,less,css}'],
      outputDir: 'subset',
      generateCss: true,
      injectCss: true,
      extraChars: '①②③④⑤⑥⑦⑧⑨⑩',
      enabled: true
    })
  ]
})
```

### Webpack

```js
// webpack.config.js
import FontSubsetPlugin from '@fe-fast/vite-plugin-font-subset/webpack'

module.exports = {
  plugins: [
    new FontSubsetPlugin({
      fonts: [
        {
          src: 'src/fonts/SourceHanSansCN-Medium.otf',
          family: 'Source Han Sans CN',
          weight: 400,
          style: 'normal'
        }
      ],
      scanDirs: ['src/**/*.{vue,js,ts,jsx,tsx,json,scss,less,css}'],
      outputDir: 'subset',
      generateCss: true,
      injectCss: true,
      extraChars: '①②③④⑤⑥⑦⑧⑨⑩',
      enabled: true
    })
  ]
}
```

### Rollup

```js
// rollup.config.js
import fontSubsetPlugin from '@fe-fast/vite-plugin-font-subset/rollup'

export default {
  plugins: [
    fontSubsetPlugin({
      fonts: [
        {
          src: 'src/fonts/SourceHanSansCN-Medium.otf',
          family: 'Source Han Sans CN',
          weight: 400,
          style: 'normal'
        }
      ],
      scanDirs: ['src/**/*.{vue,js,ts,jsx,tsx,json,scss,less,css}'],
      outputDir: 'subset',
      generateCss: true,
      extraChars: '①②③④⑤⑥⑦⑧⑨⑩',
      enabled: true
    })
  ]
}
```

## 온라인 데모

🚀 [라이브 데모 체험](https://william-xue.github.io/vite-plugin-font-subset/)

실제 프로젝트에서 폰트 서브셋화 효과를 경험해 보세요!

## 라이선스

MIT
