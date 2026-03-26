---
name: component-patterns
description: This skill should be used when the user asks to "create component", "add component", "build UI component", "make reusable component", or mentions Props interface, component composition, children pattern, conditional rendering, component structure, or export default.
version: 1.0.0
---

# React Component Patterns

## 핵심 원칙

### 1. 컴포넌트 기본 구조

```tsx
import { useState } from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

interface UserCardProps {
  name: string
  email: string
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const UserCard = ({ name, email, onEdit, onDelete }: UserCardProps) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      <p className="text-sm text-gray-500">{email}</p>
      <div className="mt-3 flex gap-2">
        <button onClick={() => onEdit(name)} className="p-2 text-gray-400 hover:text-blue-600">
          <FiEdit size={16} />
        </button>
        <button onClick={() => onDelete(name)} className="p-2 text-gray-400 hover:text-red-600">
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  )
}

export default UserCard
```

### 2. 필수 규칙

| 항목 | 규칙 |
|-----|------|
| 함수 형태 | 화살표 함수 `const Foo = () => {}` |
| Props | interface로 정의 (type alias 금지) |
| export | `export default` (파일당 1개) |
| 아이콘 | `react-icons/fi`만 사용 |
| 스타일 | Tailwind 유틸리티 클래스만 |
| 타입 | `any` 사용 금지 |
| 파일명 | PascalCase (`UserCard.tsx`) |

### 3. 파일 배치

```
components/
  common/      # 범용 (Button, Modal, DataTable, Pagination)
  layout/      # 레이아웃 (Sidebar, Header)
  form/        # 폼 (Input, Select, Toggle)
  chat/        # 도메인별
  dashboard/   # 도메인별
```

### 4. 조건부 렌더링

```tsx
// ✅ CORRECT: 삼항 연산자 또는 && 사용
{isLoading ? <Spinner /> : <Content />}
{error && <ErrorMessage message={error} />}

// ❌ WRONG: if문으로 JSX 분기
```

### 5. Children 패턴

```tsx
interface CardProps {
  title: string
  children: React.ReactNode
}

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  )
}
```

## 체크리스트

- [ ] 화살표 함수 + export default 구조인가?
- [ ] Props를 interface로 정의했는가?
- [ ] `any` 타입을 사용하지 않았는가?
- [ ] 아이콘은 `react-icons/fi`에서 가져왔는가?
- [ ] Tailwind 유틸리티 클래스만 사용했는가?
- [ ] 적절한 디렉토리에 배치했는가?
- [ ] 새 패키지를 설치하지 않았는가?
