import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { defineConfig, type UserConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackRouter({ // ensure tanstackRouter() is passed before react()
      target: 'react',
      autoCodeSplitting: true, // automatically splits new routes
    }),
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
        presets: ['@babel/preset-typescript'], // if using typescript
      },
      include: /\.[jt]sx?$/,
    }),
  ],
  envDir: '../', // if sharing `.env` in parent directory in monorepo
  resolve: { // resolve path aliases to the `/src` directory
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
  },
} satisfies UserConfig);