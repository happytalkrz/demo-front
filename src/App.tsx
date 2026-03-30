import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './contexts/ToastContext'
import { ToastContainer } from './components/common/Toast'
import ErrorBoundary from './components/common/ErrorBoundary'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Board from './pages/Board'
import Users from './pages/Users'
import DataTable from './pages/DataTable'
import Settings from './pages/Settings'
import Prompts from './pages/Prompts'
import AISummary from './pages/AISummary'
import AIPermissions from './pages/AIPermissions'
import PromptManagement from './pages/PromptManagement'
import AIChatDemo from './pages/AIChatDemo'
import NotFound from './pages/NotFound'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ToastProvider>
          <Routes>
            {/* Authentication related routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes with main layout */}
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="board" element={<Board />} />
              <Route path="users" element={<Users />} />
              <Route path="data-table" element={<DataTable />} />
              <Route path="prompts" element={<Prompts />} />
              <Route path="ai-summary" element={<AISummary />} />
              <Route path="ai-permissions" element={<AIPermissions />} />
              <Route path="prompt-management" element={<PromptManagement />} />
              <Route path="ai-chat-demo" element={<AIChatDemo />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <ToastContainer />
        </ToastProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
