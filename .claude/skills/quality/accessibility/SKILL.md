---
name: accessibility
description: This skill should be used when the user asks to "improve accessibility", "add a11y", "fix keyboard navigation", or mentions aria label, screen reader, keyboard focus, tab order, semantic HTML, alt text, or WCAG.
version: 1.0.0
---

# Accessibility (A11y) Patterns

## 핵심 원칙

### 1. 시맨틱 HTML

```tsx
// ❌ div로 모든 것을 만들지 않는다
<div onClick={handleClick}>버튼</div>
<div>네비게이션</div>

// ✅ 적절한 HTML 요소 사용
<button onClick={handleClick}>버튼</button>
<nav>네비게이션</nav>
<main>메인 콘텐츠</main>
<aside>사이드바</aside>
<header>헤더</header>
```

### 2. 아이콘 버튼

```tsx
// ❌ 텍스트 없는 아이콘 버튼
<button onClick={onDelete}><FiTrash2 /></button>

// ✅ aria-label 추가
<button onClick={onDelete} aria-label="삭제">
  <FiTrash2 size={16} />
</button>
```

### 3. 폼 접근성

```tsx
// label과 input 연결
<label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
<input id="email" type="email" aria-describedby="email-error" />
{error && <p id="email-error" className="text-sm text-red-500">{error}</p>}
```

### 4. 키보드 네비게이션

```tsx
// 모달: ESC로 닫기
useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }
  document.addEventListener('keydown', handleEsc)
  return () => document.removeEventListener('keydown', handleEsc)
}, [onClose])
```

### 5. focus 가시성

```tsx
// Tailwind focus 링 — 키보드 탐색 시 보이도록
className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
```

## 체크리스트

- [ ] 시맨틱 HTML 요소를 사용했는가?
- [ ] 아이콘 버튼에 aria-label이 있는가?
- [ ] 폼 input에 label이 연결되어 있는가?
- [ ] 모달에 ESC 닫기가 있는가?
- [ ] focus 상태가 시각적으로 표시되는가?
