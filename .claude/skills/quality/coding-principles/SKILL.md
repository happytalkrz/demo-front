---
name: coding-principles
description: This skill should be used when the user asks to "implement feature", "refactor code", "improve code", "simplify code", "clean up", or mentions code quality, DRY, KISS, YAGNI, code smell, anti-pattern, best practice, readability, maintainability, or TypeScript strict mode.
version: 1.0.0
---

# Coding Principles

## 우선순위

- 프로젝트 규약 (CLAUDE.md)이 일반 원칙보다 항상 우선한다.
- 새 패키지 설치는 금지 — 기존 의존성으로 해결할 것.

## 핵심 원칙

### 1. YAGNI (You Aren't Gonna Need It)

- 현재 요구사항에 없는 기능을 미리 구현하지 않는다.
- 설정 가능하게 만들거나 추상화 레이어를 미리 넣지 않는다.

```tsx
// ❌ 과도한 추상화
const createApiService = <T>(endpoint: string) => ({
  getAll: () => fetch(`/api/${endpoint}`).then(r => r.json() as Promise<T[]>),
  getById: (id: string) => fetch(`/api/${endpoint}/${id}`).then(r => r.json() as Promise<T>),
  // ... 아직 안 쓰는 메서드들
})

// ✅ 필요한 것만
const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch('/api/users')
  return res.json()
}
```

### 2. 컴포넌트 크기

- 한 컴포넌트가 200줄을 넘으면 분리를 검토한다.
- 반복되는 JSX 패턴이 3회 이상이면 컴포넌트로 추출한다.
- 커스텀 훅은 로직 재사용이 2회 이상일 때만 만든다.

### 3. 타입 안전

```tsx
// ❌ WRONG
const data: any = response
const items = data as unknown as Item[]

// ✅ CORRECT
interface ApiResponse {
  items: Item[]
  total: number
}
const data: ApiResponse = await response.json()
```

### 4. 불변성

```tsx
// ❌ 직접 변경
users.push(newUser)
user.name = 'new name'

// ✅ 새 객체/배열 생성
setUsers(prev => [...prev, newUser])
setUser(prev => ({ ...prev, name: 'new name' }))
```

### 5. 이벤트 핸들러 네이밍

```tsx
// Props: on + 동사 (부모에서 전달)
interface Props {
  onSubmit: () => void
  onClick: () => void
  onChange: (value: string) => void
}

// 내부 핸들러: handle + 동사
const handleSubmit = () => { ... }
const handleClick = () => { ... }
```

## 금지 사항

- `any` 타입 사용
- `// @ts-ignore`, `// @ts-expect-error`
- `console.log` 커밋 (디버깅 후 제거)
- 인라인 style 속성 (`style={{}}`)
- CSS 파일 추가
- 새 npm 패키지 설치

## 체크리스트

- [ ] 불필요한 추상화를 넣지 않았는가?
- [ ] `any` 타입을 사용하지 않았는가?
- [ ] 상태 업데이트가 불변성을 지키는가?
- [ ] `console.log`를 제거했는가?
- [ ] 새 패키지를 설치하지 않았는가?
- [ ] `npx tsc --noEmit` 통과하는가?
