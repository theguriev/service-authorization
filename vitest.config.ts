import { defineConfig } from 'vitest/config'
import Unimport from 'unimport/unplugin'
import { resolve } from 'pathe'

export default defineConfig({
  plugins: [
    Unimport.vite({
      imports: [
        { name: 'describe', from: 'vitest' },
        { name: 'it', from: 'vitest' },
        { name: 'expect', from: 'vitest' },
        { name: '$fetch', from: 'ofetch' }
      ],
      dirs: ['./utils'],
      dts: true
    })
  ],
  test: {
    coverage: {
      reporter: ['text', 'clover', 'json']
    },
    include: ['./test/**/*.test.ts'],
    globalSetup: './global-setup.ts'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.')
    }
  }
})
