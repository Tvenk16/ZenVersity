import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import ZenVersity from './ZenVersity.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ZenVersity />
  </StrictMode>,
)
