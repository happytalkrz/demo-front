---
name: new-page
description: This skill should be used when the user asks to "create new page", "add page", "implement page", "build page", or mentions new admin page, dashboard page, management page, list page, detail page, or CRUD page.
version: 1.0.0
---

# New Page Implementation Guide

## 구현 순서

```
1. 페이지 컴포넌트 생성 (src/pages/)
   ↓
2. 라우트 등록 (src/App.tsx)
   ↓
3. 사이드바 메뉴 추가 (MainLayout)
   ↓
4. 타입 체크 (npx tsc --noEmit)
```

## 페이지 기본 템플릿

```tsx
import { FiPlus } from 'react-icons/fi'

const PageName = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">페이지 제목</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <FiPlus size={16} />
          <span>추가</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* 콘텐츠 영역 */}
      </div>
    </div>
  )
}

export default PageName
```

## CRUD 페이지 구성

### 목록 페이지

```tsx
const Users = () => {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">사용자 관리</h1>
        <button onClick={() => setIsModalOpen(true)} className="...">
          <FiPlus size={16} />
          <span>사용자 추가</span>
        </button>
      </div>

      {/* 검색/필터 */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <input type="text" placeholder="검색..." className="w-full px-4 py-2 border rounded-lg" />
      </div>

      {/* 테이블 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">이름</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

## 필수 규칙

- 목업 데이터는 `src/data/`에 별도 파일로 분리
- 타입 정의는 `src/types/`에 배치
- 페이지 제목은 한국어
- 라우트 경로는 kebab-case
- 아이콘은 `react-icons/fi`

## 체크리스트

- [ ] `src/pages/`에 컴포넌트 생성했는가?
- [ ] `App.tsx`에 Route 등록했는가?
- [ ] 사이드바 메뉴에 추가했는가?
- [ ] 목업 데이터를 `src/data/`에 분리했는가?
- [ ] 타입을 `src/types/`에 정의했는가?
- [ ] `npx tsc --noEmit` 통과하는가?
