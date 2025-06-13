import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': { // '/api'로 시작하는 요청
        target: 'http://khunggum.khu.ac.kr:8080/v1/', // 이 URL로 프록시
        changeOrigin: true, // 호스트 헤더를 타겟 URL로 변경
        rewrite: (path) => path.replace(/^\/api/, ''), // '/api' 접두사 제거 (필요시)
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js 글로벌 polyfill
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})