import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// ElementPlus自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default defineConfig({
  plugins: [
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      // eslint-disable-next-line no-undef
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: './',
  server: {
    proxy: {
      '/api': {
        target: 'http://backend-api-02.newbee.ltd/manage-api/v1', // 凡是遇到 /api 路径的请求，都映射到 target 属性
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '') // 重写 api 为 空，就是去掉它
      }
    }
  },
})
