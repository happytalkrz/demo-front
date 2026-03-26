---
name: routing
description: This skill should be used when the user asks to "add route", "add page route", "register route", "setup routing", "create navigation", or mentions react-router-dom, BrowserRouter, Routes, Route, Link, Outlet, useNavigate, useParams, protected route, or sidebar menu item.
version: 1.0.0
---

# Routing & Navigation

## 핵심 원칙

### 1. 라우트 등록 (App.tsx)

모든 라우트는 `src/App.tsx`에서 중앙 관리한다.

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인증 불필요 */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 인증 필요 — MainLayout 하위 */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

### 2. 새 페이지 추가 시 필수 작업

1. `src/pages/페이지명.tsx` 생성
2. `src/App.tsx`에 Route 추가 (MainLayout 하위)
3. 사이드바 메뉴 아이템 추가 (아이콘 + 라벨 + 경로)

### 3. 라우트 경로 규칙

| 항목 | 규칙 | 예시 |
|-----|------|------|
| 경로 형식 | kebab-case | `/prompt-management` |
| 동적 파라미터 | `:param` | `/users/:userId` |
| 인덱스 라우트 | `index` | `<Route index element={<Dashboard />} />` |

### 4. 네비게이션

```tsx
// 선언적 — Link 사용
import { Link } from 'react-router-dom'
<Link to="/users" className="flex items-center px-4 py-3 hover:bg-gray-100">
  <FiUsers className="mr-3" />
  <span>사용자 관리</span>
</Link>

// 프로그래밍 — useNavigate 사용
import { useNavigate } from 'react-router-dom'
const navigate = useNavigate()
navigate('/users')
```

### 5. 사이드바 메뉴 데이터

메뉴 아이템은 배열로 관리하여 사이드바에서 `map`으로 렌더링한다.

```tsx
import { FiHome, FiUsers, FiSettings } from 'react-icons/fi'

const menuItems = [
  { path: '/dashboard', label: '대시보드', icon: FiHome },
  { path: '/users', label: '사용자 관리', icon: FiUsers },
  { path: '/settings', label: '설정', icon: FiSettings },
]
```

## 체크리스트

- [ ] App.tsx에 Route가 등록되었는가?
- [ ] MainLayout 하위에 배치되었는가? (인증 필요 페이지)
- [ ] 경로가 kebab-case인가?
- [ ] 사이드바 메뉴에 항목이 추가되었는가?
- [ ] 아이콘은 `react-icons/fi`에서 선택했는가?
