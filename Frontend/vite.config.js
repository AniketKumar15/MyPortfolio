import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) return 'vendor';
            if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) return 'animation';
            if (id.includes('@tiptap') || id.includes('lowlight')) return 'editor';
            if (id.includes('lucide-react') || id.includes('react-icons') || id.includes('react-hot-toast')) return 'ui';
            return 'modules';
          }
        }
      }
    }
  }
})
