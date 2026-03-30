/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // TSX 파일도 포함해야 Tailwind가 적용됨
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
