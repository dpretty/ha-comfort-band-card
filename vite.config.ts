import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    // The oldest browsers the card loads in (#113). Home Assistant itself
    // supports older ones (Chrome 67, its legacy build); the card stops at
    // Chrome 85, and its layout is whole from Chrome 87. esbuild lowers the
    // newer syntax (class static blocks, logical assignment) for these.
    target: ['chrome85', 'edge85', 'firefox98', 'safari15.4', 'ios15.4'],
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
