---
name: new-component
description: This skill should be used when the user asks to "create component", "build component", "make component", "add UI element", or mentions Button, Modal, Dialog, Card, Table, Form, Input, Select, Toggle, Toast, Alert, Tabs, Dropdown, Tooltip, Badge, or Avatar component.
version: 1.0.0
---

# New Component Implementation Guide

## 구현 순서

```
1. 컴포넌트 파일 생성 (적절한 디렉토리)
   ↓
2. Props interface 정의
   ↓
3. 컴포넌트 구현 (Tailwind)
   ↓
4. 타입 체크 (npx tsc --noEmit)
```

## 디렉토리 배치 규칙

| 종류 | 디렉토리 | 예시 |
|-----|---------|------|
| 범용 UI | `components/common/` | Button, Modal, DataTable, Badge |
| 레이아웃 | `components/layout/` | Sidebar, Header, Footer |
| 폼 관련 | `components/form/` | Input, Select, Toggle, FormGroup |
| 도메인별 | `components/도메인명/` | `dashboard/StatCard` |

## 컴포넌트 유형별 예시

### Button

```tsx
interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  onClick: () => void
  disabled?: boolean
}

const variantStyles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

const Button = ({ label, variant = 'primary', size = 'md', onClick, disabled = false }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg font-medium transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {label}
    </button>
  )
}

export default Button
```

### Modal

```tsx
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
```

## 필수 규칙

- 화살표 함수 + export default
- Props는 interface (optional props에 `?` 사용)
- 기본값은 구조 분해에서 할당: `variant = 'primary'`
- 스타일 변형은 객체 매핑으로 관리
- Tailwind 클래스만 사용
- `react-icons/fi`만 사용

## 체크리스트

- [ ] 적절한 디렉토리에 배치했는가?
- [ ] Props interface가 정의되어 있는가?
- [ ] optional props에 기본값이 있는가?
- [ ] `any` 타입을 사용하지 않았는가?
- [ ] Tailwind 클래스만 사용했는가?
- [ ] `npx tsc --noEmit` 통과하는가?
