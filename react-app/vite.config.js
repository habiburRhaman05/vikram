import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
//
// NOTE on tailwindcss(): the plugin is registered so Tailwind CAN be turned
// on later (shadcn/ui needs it), but its generated CSS is not imported by
// any entry point yet - see src/styles/tailwind.css. Nothing in the app
// currently uses Tailwind classes, so this plugin is a no-op today: it has
// zero effect on the migrated site's visual output.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
