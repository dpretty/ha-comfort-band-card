import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    // The oldest browsers the card runs in (#113). Home Assistant itself
    // supports older ones (Chrome 67, its legacy build). Chrome 87 is where
    // the logical insets and margins the card uses arrived. esbuild lowers
    // the syntax these don't run, such as a class static block.
    target: ['chrome87', 'edge87', 'firefox98', 'safari15.4', 'ios15.4'],
    lib: {
      entry: 'card/src/index.ts',
      formats: ['es'],
      fileName: () => 'comfort-band-card.js',
    },
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
  esbuild: {
    legalComments: 'none',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['card/test/**/*.test.ts'],
    setupFiles: ['card/test/_setup.ts'],
  },
});
