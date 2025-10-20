import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'styled-components': path.resolve(__dirname, './node_modules/styled-components'),
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'react-router-dom': path.resolve(__dirname, './node_modules/react-router-dom'),
      'react-icons': path.resolve(__dirname, './node_modules/react-icons'),
      'framer-motion': path.resolve(__dirname, './node_modules/framer-motion'),
    }
  },
  optimizeDeps: {
    include: ['styled-components', 'react', 'react-dom', 'react-router-dom', 'react-icons', 'framer-motion']
  }
})
