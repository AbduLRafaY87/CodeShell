import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // <-- important for Netlify drop (relative paths)
  optimizeDeps: {
    // include: ['react-monaco-editor'],
  },
})
