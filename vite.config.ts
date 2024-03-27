import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      afterBuild(emittedFiles) {
        const dtsFile = emittedFiles.has(resolve(__dirname, 'dist', 'composables', 'useForm.d.ts').replace(/\\/g, '/'))
        if (dtsFile) {
          const source = resolve(__dirname, 'src', 'lib', 'composables', 'useForm.d.ts')
          const target = resolve(__dirname, 'dist', 'composables', 'useForm.d.ts')
          fs.copyFileSync(source, target)
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'lib', 'index.ts'),
      name: 'vue-form-ease',
      fileName: 'index'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  }
})
