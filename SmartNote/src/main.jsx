import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import RouterApp from './router/RouterAPP'
import { DarkModeProvider } from './contexts/Darkmode';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <DarkModeProvider>
      <RouterApp/>
    </DarkModeProvider>
    </BrowserRouter>
  </StrictMode>
)
