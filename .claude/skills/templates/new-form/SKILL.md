---
name: new-form
description: This skill should be used when the user asks to "create form", "add form", "build form", "implement form validation", or mentions form handling, input component, form submission, validation, controlled input, form state, or onChange handler.
version: 1.0.0
---

# Form Implementation Guide

## 핵심 원칙

### 1. Controlled Input 패턴

```tsx
const [form, setForm] = useState({ name: '', email: '' })

const handleChange = (field: string, value: string) => {
  setForm(prev => ({ ...prev, [field]: value }))
}

<input
  type="text"
  value={form.name}
  onChange={(e) => handleChange('name', e.target.value)}
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
/>
```

### 2. 폼 컴포넌트 구조

```
components/form/
  Input.tsx       # 텍스트 입력 (라벨, 에러 메시지, 아이콘)
  Select.tsx      # 드롭다운 선택
  Toggle.tsx      # on/off 스위치
  FormGroup.tsx   # 라벨 + 입력 + 에러 래퍼
```

### 3. Input 컴포넌트

```tsx
interface InputProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  error?: string
  required?: boolean
}

const Input = ({ label, value, onChange, type = 'text', placeholder, error, required }: InputProps) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
```

### 4. 유효성 검사

```tsx
interface FormErrors {
  [key: string]: string
}

const validate = (form: FormData): FormErrors => {
  const errors: FormErrors = {}
  if (!form.name.trim()) errors.name = '이름을 입력하세요'
  if (!form.email.includes('@')) errors.email = '올바른 이메일을 입력하세요'
  return errors
}

const handleSubmit = () => {
  const errors = validate(form)
  if (Object.keys(errors).length > 0) {
    setErrors(errors)
    return
  }
  // 제출 로직
}
```

## 필수 규칙

- 외부 폼 라이브러리 설치 금지 (react-hook-form, formik 등)
- Controlled input 패턴만 사용
- 스타일: Tailwind 클래스만
- 에러 상태: `border-red-500` + 에러 메시지
- focus 상태: `focus:ring-2 focus:ring-blue-500`

## 체크리스트

- [ ] Controlled input 패턴을 사용했는가?
- [ ] 폼 상태에 타입이 지정되어 있는가?
- [ ] 유효성 검사가 포함되어 있는가?
- [ ] 에러 메시지가 한국어로 표시되는가?
- [ ] 외부 라이브러리를 설치하지 않았는가?
