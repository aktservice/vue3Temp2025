import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteSingleFile()],
  server: {
    host: true,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: false,
  },
});
