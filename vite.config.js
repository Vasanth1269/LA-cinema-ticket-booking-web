import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/LA-cinema-ticket-booking-web/",
  plugins: [
    react(),
     tailwindcss(),

  ],
})
