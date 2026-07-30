import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    // Only used when vite is run directly on the host instead of behind the
    // nginx gateway. VITE_API_URL is relative ("/api"), so without this the
    // request would resolve against the dev server, which 404s it.
    proxy: {
      '/api': 'http://localhost',
    },
  },
})
