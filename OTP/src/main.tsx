import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import App from './App.tsx'
import Login from './Login.tsx'
import MainPage from './mainPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
