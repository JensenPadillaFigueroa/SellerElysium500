import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// `base` is set for GitHub Pages (served at /SellerElysium500/).
// Override locally or in other hosts by setting VITE_BASE=/ at build time.
const base = process.env.VITE_BASE ?? '/SellerElysium500/'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? base : '/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
}))
