import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        'react-native': 'react-native-web',
      },
    },
    optimizeDeps: {
      include: ['react-native-web'],
    },
    define: {
      __DEV__: JSON.stringify(mode !== 'production'),
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  };
});
