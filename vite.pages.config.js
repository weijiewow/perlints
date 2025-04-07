import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [eslint()],
  mode: 'production',
  base: './',
  build: {
    outDir: 'pages',
    assetsDir: 'assets',
  },
});
