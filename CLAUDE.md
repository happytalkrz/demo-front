# demo-front

React 기반 관리자 웹 UI 템플릿 프로젝트.

## 기술 스택

- **React 18** + TypeScript (Vite 빌드)
- **Tailwind CSS** (PostCSS + Autoprefixer)
- **react-router-dom** (클라이언트 라우팅)
- **react-icons** (아이콘, `fi` 프리픽스 사용 중)
- 패키지 매니저: npm

## 프로젝트 구조

```
src/
  App.tsx              # 라우트 정의 (모든 라우트 중앙 관리)
  main.tsx             # 엔트리포인트
  layouts/             # 레이아웃 (MainLayout)
  pages/               # 페이지 컴포넌트
  components/          # 공용 컴포넌트
    common/            # Pagination, Tabs, DataTable 등
    layout/            # Sidebar, Header 등 레이아웃 컴포넌트
    form/              # Input, Select, Toggle 등 폼 컴포넌트
    chat/              # 채팅 관련
  features/            # 기능별 모듈
    auth/              # 로그인/회원가입
  data/                # 목업 데이터
  types/               # 타입 정의
  styles/              # CSS
```

## 명령어

```bash
npm run dev        # 개발 서버 (Vite)
npm run build      # tsc + vite build
npm run preview    # 빌드 결과 프리뷰
npx tsc --noEmit   # 타입 체크 (테스트 대용)
```

## 필수 규칙 (반드시 지킬 것)

### 패키지 제한
- **새 npm 패키지 설치 절대 금지.** 기존 의존성만으로 구현할 것.
- 현재 사용 가능한 패키지: `react`, `react-dom`, `react-router-dom`, `react-icons`, `@vitejs/plugin-react`, `tailwindcss`, `typescript`
- `react-feather`, `lucide-react`, `@heroicons`, `headlessui`, `radix-ui`, `shadcn` 등 사용 금지.

### 아이콘
- **반드시 `react-icons/fi` (Feather Icons)만 사용.**
- import 예시: `import { FiHome, FiUsers, FiSettings } from 'react-icons/fi'`
- 다른 아이콘 세트 (`react-icons/ai`, `react-icons/md` 등) 사용 금지.

### 스타일
- **Tailwind CSS 유틸리티 클래스만 사용.** 인라인 style, CSS-in-JS, styled-components 금지.
- CSS 파일 추가 금지. 기존 `styles/index.css`, `styles/style.css`만 사용.
- 반응형: `sm:` (640px) / `md:` (768px) / `lg:` (1024px) 브레이크포인트.
- hover, focus 상태 포함: `hover:bg-gray-100`, `focus:ring-2 focus:ring-blue-500`

## 코딩 컨벤션

### 컴포넌트
- 함수형 + 화살표 함수: `const Foo = () => {}`
- `export default` (파일당 1개 컴포넌트)
- Props는 interface로 정의:
```tsx
interface ButtonProps {
  label: string
  onClick: () => void
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      {label}
    </button>
  )
}

export default Button
```

### 페이지 추가 시
1. `src/pages/페이지명.tsx` 생성
2. `src/App.tsx`의 MainLayout Route 안에 라우트 추가
3. 사이드바 메뉴에 네비게이션 항목 추가 (아이콘 + 라벨 + 경로)
4. 라우트 경로는 kebab-case: `/user-detail`

### 공용 컴포넌트 추가 시
- 범용: `components/common/`
- 레이아웃: `components/layout/`
- 폼: `components/form/`
- 도메인별: `components/도메인명/`

### 타입
- 공유 타입은 `src/types/`에 정의
- 컴포넌트 전용 Props 타입은 같은 파일에 정의
- `any` 타입 사용 금지

### 데이터
- 목업 데이터는 `src/data/`에 배치
- 타입과 함께 export

### 언어
- UI 텍스트는 한국어
- 변수/함수명은 영어 (camelCase)
- 컴포넌트명은 PascalCase

## 주의사항

- `react`, `react-dom`은 `@vitejs/plugin-react` 의존성으로 설치됨
- vite.config 파일 없이 기본 설정으로 동작 중
- tsconfig에서 `"jsx": "react-jsx"` 사용
- base branch: `main`
- 구현 완료 후 반드시 `npx tsc --noEmit`으로 타입 체크 통과 확인
