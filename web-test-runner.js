import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  plugins: [esbuildPlugin({ ts: true })],
  nodeResolve: true,
  playwright: true,
  browsers: ['chromium'],
  testFramework: {
    // https://mochajs.org/api/mocha
    config: {
      ui: 'tdd',
      timeout: '60000' // default 2000
    }
  }
};
