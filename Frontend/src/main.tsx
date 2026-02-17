import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import RouterApp from './router/RouterAPP'
import { UserProvider, NetworkStatusProvider } from '@/contexts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <NetworkStatusProvider>
          <RouterApp />
        </NetworkStatusProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
)
