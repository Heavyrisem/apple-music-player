import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          'babel-plugin-macros',
          [
            '@emotion/babel-plugin-jsx-pragmatic',
            {
              export: 'jsx',
              import: '__cssprop',
              module: '@emotion/react',
            },
          ],
          ['@babel/plugin-transform-react-jsx', { pragma: '__cssprop' }, 'twin.macro'],
        ],
      },
    }),
    tsconfigPaths(),
    eslint({ emitWarning: true, include: 'src/**/*.{ts,tsx}' }),
  ],
  resolve: {
    alias: [
      { find: '@src', replacement: 'src' },
      { find: '@components', replacement: 'src/components' },
      { find: '@pages', replacement: 'src/pages' },
      { find: '@hooks', replacement: 'src/hooks' },
      { find: '@styles', replacement: 'src/styles' },
      { find: '@assets', replacement: 'src/assets' },
      { find: '@utils', replacement: 'src/utils' },
      { find: '@contexts', replacement: 'src/contexts' },
    ],
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  server: {
    proxy: {
      '/music': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
