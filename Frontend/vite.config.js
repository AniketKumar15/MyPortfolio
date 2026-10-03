import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
import fs from 'fs';

const injectSeoPlugin = () => {
  return {
    name: 'inject-seo',
    transformIndexHtml(html) {
      if (fs.existsSync('public/seo-links.html')) {
        const links = fs.readFileSync('public/seo-links.html', 'utf-8');
        return html.replace('<body>', `<body>\n    <noscript id="seo-links">\n${links}\n    </noscript>`);
      }
      return html;
    }
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), injectSeoPlugin()],
})
