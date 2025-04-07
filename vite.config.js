import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [eslint(), dts({ tsconfigPath: './tsconfig.build.json' })],
  build: {
    lib: {
      entry: ['src/perlin.ts'],
      fileName: format => `perlin.${format}.js`,
      name: 'perlin',
    },
    rollupOptions: {

    },
  },
});
