새 페이지를 생성하고 라우트에 등록합니다.

## 입력
$ARGUMENTS — 페이지 이름 (예: `UserDetail`, `Reports`)

## 작업
1. `src/pages/$ARGUMENTS.tsx`에 페이지 컴포넌트 생성
2. `src/App.tsx`의 MainLayout Route 안에 라우트 추가
3. 필요시 `src/layouts/MainLayout.tsx` 사이드바 메뉴에 네비게이션 항목 추가

## 규칙
- 화살표 함수 컴포넌트 + `export default`
- 페이지 제목을 h1으로 포함
- Tailwind CSS 사용
- 라우트 경로는 kebab-case (예: `user-detail`)
- 사이드바 아이콘은 `react-icons/fi` 에서 선택
