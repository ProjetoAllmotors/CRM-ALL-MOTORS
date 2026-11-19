import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/montserrat/700.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App.jsx'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
