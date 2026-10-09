import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppWrapper } from './components/common/PageMeta.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AlertProvider } from './context/AlertContext.tsx'
import { AlertContainer } from './components/ui/alert/AlertContainer.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <AlertProvider>
          <AuthProvider>
            <App />
            <AlertContainer />
          </AuthProvider>
        </AlertProvider>
      </AppWrapper>
    </QueryClientProvider>
  </StrictMode>,
)
