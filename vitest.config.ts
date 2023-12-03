import { defineConfig } from 'vitest/config'
import Unimport from 'unimport/unplugin'

export default defineConfig({
  plugins: [
    Unimport.vite({
      imports: [
        { name: 'describe', from: 'vitest' },
        { name: 'it', from: 'vitest' },
        { name: 'expect', from: 'vitest' }
      ],
      dirs: ['./utils'],
      dts: true
    })
  ],
  test: {
    coverage: {
      reporter: ['text', 'clover', 'json']
    },
    include: ['./test/**/*.test.ts']
  }
})
