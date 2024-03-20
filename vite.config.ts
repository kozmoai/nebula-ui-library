import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default {
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [vue(), svgLoader()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  build: {
    emptyOutDir: false,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'prefect-ui-library',
    },
    rollupOptions: {
      external: [
        'vue',
        'vue-router',
        'vee-validate',
        '@prefecthq/vue-compositions',
        '@kozmoai/nebula-design',
        '@kozmoai/vue-charts',
      ],
      output: {
        exports: 'named',
        // Provide vue as a global variable to use in the UMD build
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
}