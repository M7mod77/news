import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/index.css'

// Vite's BASE_URL is '/news/' in this project, so it is the single source of truth for
// the deployment path. React Router wants it without the trailing slash ('/news'), and
// an empty string when the app is served from the domain root.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter basename={basename}>
            <App />
        </BrowserRouter>
    </StrictMode>
)
