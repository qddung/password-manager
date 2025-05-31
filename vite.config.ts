import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  define: {
    // eslint-disable-next-line no-undef
    'process.env': process.env
  }
})
