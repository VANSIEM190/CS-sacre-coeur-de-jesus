import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import RouterApp from './router/RouterAPP'
import {
  StudentProvider,
  AdminProvider,
  NetworkStatusProvider,
} from '@/contexts'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <StudentProvider>
        <AdminProvider>
          <NetworkStatusProvider>
            <RouterApp />
          </NetworkStatusProvider>
        </AdminProvider>
      </StudentProvider>
    </BrowserRouter>
  </StrictMode>
)
