새 React 컴포넌트를 생성합니다.

## 입력
$ARGUMENTS — 컴포넌트 경로와 이름 (예: `components/common/Button`, `pages/UserDetail`)

## 규칙
- `src/$ARGUMENTS.tsx` 경로에 생성
- 화살표 함수 컴포넌트 + `export default`
- Props 타입을 interface로 정의 (props가 있을 경우)
- Tailwind CSS 유틸리티 클래스 사용
- 불필요한 import 없이 최소한으로 구성
- 파일 상단에 빈 줄 없이 import부터 시작

## 예시
```tsx
import { useState } from 'react'

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
