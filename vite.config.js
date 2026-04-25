import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  optimizeDeps: {
    include: ['@phosphor-icons/react', 'lucide-react']
  },
  build: {
    rollupOptions: {
      external: []
    }
  }
})