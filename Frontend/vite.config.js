import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animation: ['framer-motion', 'gsap', '@gsap/react', 'lenis'],
          editor: ['@tiptap/react', '@tiptap/starter-kit', '@tiptap/extension-image', '@tiptap/extension-link', '@tiptap/extension-code-block-lowlight', 'lowlight'],
          ui: ['lucide-react', 'react-icons', 'react-hot-toast']
        }
      }
    }
  }
})
