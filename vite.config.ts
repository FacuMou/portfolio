import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  base: '/portfolio/src/',
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
})
