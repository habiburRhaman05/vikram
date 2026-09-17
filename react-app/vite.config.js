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
  // host: true binds the dev server to 0.0.0.0 instead of the default
  // "localhost". On Windows that default resolves to ::1 only, so the server
  // answers on http://localhost and http://[::1] but REFUSES
  // http://127.0.0.1 - which is what a preview pane, an iframe or a phone on
  // the same network asks for first. The page was fine; it was simply
  // unreachable. Binding all interfaces makes every localhost form work.
  server: { host: true },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
