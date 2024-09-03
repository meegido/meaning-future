import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
  },
  build: {
    rollupOptions: {
      input: {
        main: 'src/main.tsx',
      },
      external: (id: string) => {
        return /.*\.test\.(js|ts)$/.test(id) || /tests/.test(id);
      },
    },
  },
});
