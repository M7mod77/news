import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Single-page app: one index.html, routing handled by React Router.
export default defineConfig({
    plugins: [react()]
})
