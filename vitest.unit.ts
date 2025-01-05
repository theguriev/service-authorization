import { defineConfig } from 'vitest/config'
import Unimport from 'unimport/unplugin'
import { resolve } from 'pathe'
import { imports } from './constants'

export default defineConfig({
  plugins: [
    Unimport.vite({
      imports,
      dirs: ['./utils'],
      dts: true
    })
  ],
  test: {
    coverage: {
      reporter: ['text', 'clover', 'json'],
      include: ['utils/**/*.ts', 'composables/**/*.ts']
    },
    include: ['./test-unit/*.test.ts']
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.')
    }
  }
})
