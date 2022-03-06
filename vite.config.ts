import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite';
import { viteMockServe } from 'vite-plugin-mock'

const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
  '/@': pathResolve('./src/'),
  'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
};

// https://vitejs.dev/config/
const viteConfig = defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  return {
    // 项目根目录
    root: process.cwd(),
    resolve: { alias },
    // 静态资源服务的文件夹
    publicDir: "public",
    // 项目部署的基础路径
    base: command === 'serve' ? './' : env.VITE_PUBLIC_PATH,
    server: {
      // 服务器主机名
      host: '0.0.0.0',
      // 端口号
      port: env.VITE_PORT as unknown as number,
      open: env.VITE_OPEN,
      // 设为 true 时若端口已被占用则会直接退出，
      // 而不是尝试下一个可用端口
      strictPort: true,
      // 传递给 chokidar 的文件系统监视器选项
      watch: {},
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          ws: true,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      // 输出路径
      outDir: 'dist',
      // 生成静态资源的存放路径
      assetsDir: "assets",
      // 单位字节（1024等于1kb） 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
      assetsInlineLimit: 4096,
      // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      cssCodeSplit: true,
      // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件
      sourcemap: false,
      // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'  还可设置为 'es2015' 'es2016'等
      target: 'esnext',
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      // 单位kb  打包后文件大小警告的限制 (文件大于此此值会出现警告)
      chunkSizeWarningLimit: 2000,
      // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
      // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
      minify: 'esbuild',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
          drop_debugger: true,
        },
        ie8: true,
        output: {
          comments: true,
        },
      },
      rollupOptions: {
        output: {
          compact: true,
          // 拆分代码
          manualChunks: {
            'vue': ['vue', 'vue-router', 'vuex', 'vue-i18n'],
            'element-plus': ['element-plus'],
            'axios': ['axios'],
          },
          entryFileNames: `assets/[name].${ new Date().getTime() }.js`,
          chunkFileNames: `assets/[name].${ new Date().getTime() }.js`,
          assetFileNames: `assets/[name].${ new Date().getTime() }.[ext]`,
        },
      },
    },
    optimizeDeps: {
      include: [
        'element-plus/lib/locale/lang/zh-cn',
        'element-plus/lib/locale/lang/en'
      ],
    },
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
      preprocessorOptions: {
        sass: {
          charset: false,
          javascriptEnabled: true,
        },
        scss: {
          charset: false,
          javascriptEnabled: true,
        }
      }
    },
    define: {
      __VUE_I18N_LEGACY_API__: JSON.stringify(false),
      __VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
      __INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
    },
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command !== 'build',
        watchFiles: true,
        injectCode: `
                import { setupProdMockServer } from '../mock/_createProductionServer';
                setupProdMockServer();
                `,
        ignore: /^\_/,
        logger: true,
      }),
    ],
  }
});

export default viteConfig;
