import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { type UserConfig, defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import babel from '@rolldown/plugin-babel';
import path from 'path';

// https://vite.dev/config
export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackRouter({ // ensure tanstackRouter is passed before react
      target: 'react',
      autoCodeSplitting: true, // automatically splits new routes
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: { // resolve path aliases to the `/src` directory
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
  server: { port: 3000 },
} satisfies UserConfig);