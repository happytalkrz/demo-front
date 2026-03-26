---
name: tailwind-patterns
description: This skill should be used when the user asks to "style component", "add styles", "improve design", "fix layout", "make responsive", or mentions Tailwind CSS, className, responsive design, dark mode, hover state, focus state, grid layout, flexbox, spacing, color scheme, or breakpoint.
version: 1.0.0
---

# Tailwind CSS Patterns

## 핵심 원칙

### 1. 스타일 방법

- **Tailwind 유틸리티 클래스만 사용**
- CSS 파일 추가 금지
- 인라인 style 속성 금지
- CSS-in-JS, styled-components 금지

### 2. 색상 팔레트

| 용도 | 색상 |
|-----|------|
| 주요 액션 | `bg-blue-600`, `text-blue-600`, `hover:bg-blue-700` |
| 성공 | `bg-green-500`, `text-green-600` |
| 경고 | `bg-yellow-500`, `text-yellow-600` |
| 위험/삭제 | `bg-red-600`, `text-red-600`, `hover:bg-red-700` |
| 텍스트 (주) | `text-gray-900` |
| 텍스트 (보조) | `text-gray-500` |
| 배경 | `bg-gray-100` (전체), `bg-white` (카드) |
| 테두리 | `border-gray-200` |

### 3. 레이아웃 패턴

```tsx
// 카드
<div className="bg-white rounded-lg shadow-sm p-6">

// 페이지 헤더 (제목 + 버튼)
<div className="flex items-center justify-between mb-6">

// 그리드 (반응형)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

// 센터 정렬
<div className="flex items-center justify-center min-h-screen">
```

### 4. 반응형 브레이크포인트

```tsx
// 모바일 → 태블릿 → 데스크탑
<div className="p-4 md:p-6 lg:p-8">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
<div className="w-full md:w-64 lg:w-80">
```

| 접두사 | 크기 | 용도 |
|--------|------|------|
| (기본) | 0px+ | 모바일 |
| `sm:` | 640px+ | 작은 태블릿 |
| `md:` | 768px+ | 태블릿 |
| `lg:` | 1024px+ | 데스크탑 |

### 5. 인터랙션 상태

```tsx
// 버튼
className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"

// 입력
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"

// 테이블 행
className="hover:bg-gray-50 transition-colors"

// 비활성화
className="opacity-50 cursor-not-allowed"
```

### 6. 스타일 변형 패턴

```tsx
// 객체 매핑으로 변형 관리
const statusStyles: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800',
}

<span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
  {status}
</span>
```

## 체크리스트

- [ ] Tailwind 유틸리티 클래스만 사용했는가?
- [ ] 인라인 style을 사용하지 않았는가?
- [ ] 반응형 대응이 되어 있는가?
- [ ] hover/focus 상태가 포함되어 있는가?
- [ ] 프로젝트 색상 팔레트를 따르는가?
