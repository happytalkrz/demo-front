---
name: state-management
description: This skill should be used when the user asks to "manage state", "add state", "use context", "share state", or mentions useState, useReducer, useContext, Context API, global state, local state, lifting state up, or derived state.
version: 1.0.0
---

# State Management

## 핵심 원칙

### 1. 상태 선택 기준

| 범위 | 방법 | 사용처 |
|-----|------|--------|
| 컴포넌트 내부 | `useState` | 폼 입력, 토글, 모달 열림/닫힘 |
| 부모-자식 공유 | Props 전달 | 목록 → 상세, 폼 → 부모 |
| 전역 (앱 전체) | Context API | 인증 상태, 테마, 토스트 알림 |

### 2. useState 패턴

```tsx
const [isOpen, setIsOpen] = useState(false)
const [users, setUsers] = useState<User[]>([])
const [form, setForm] = useState({ name: '', email: '' })

// 객체 상태 업데이트
setForm(prev => ({ ...prev, name: '새 이름' }))

// 배열 상태 업데이트
setUsers(prev => [...prev, newUser])
setUsers(prev => prev.filter(u => u.id !== targetId))
```

### 3. Context 패턴

```tsx
import { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (user: User) => setUser(user)
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export { AuthProvider, useAuth }
```

### 4. 금지 사항

- 외부 상태 관리 라이브러리 설치 금지 (Redux, Zustand, Jotai 등)
- `any` 타입의 상태 금지 — 반드시 타입 지정
- 불필요한 전역 상태 금지 — 로컬로 충분하면 로컬 사용

## 체크리스트

- [ ] 상태 범위에 맞는 방법을 선택했는가?
- [ ] 상태에 타입이 지정되어 있는가?
- [ ] Context 사용 시 커스텀 훅으로 감쌌는가?
- [ ] 외부 라이브러리를 설치하지 않았는가?
