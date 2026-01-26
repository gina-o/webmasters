import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/webmasters/' // THIS MUST MATCH your GitHub repo name
})


