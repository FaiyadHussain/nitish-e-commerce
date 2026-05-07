import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import initScrollReveal from './utils/scrollReveal'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Initialize simple scroll reveal for elements with `.reveal`
initScrollReveal()
