import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import RouterApp from './router/RouterAPP'
import { StudentProvider } from './contexts/StudentContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <StudentProvider>
        <RouterApp />
      </StudentProvider>
    </BrowserRouter>
  </StrictMode>
)
