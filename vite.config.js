import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Single-page app: one index.html, routing handled by React Router.
// `base` is the GitHub Pages project path (https://M7mod77.github.io/news/), and it is
// also what React Router reads as its basename via import.meta.env.BASE_URL.
export default defineConfig({
    base: '/news/',
    plugins: [react()]
})
