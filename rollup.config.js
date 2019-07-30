import { createCompatibilityConfig } from '@open-wc/building-rollup';

const configs = createCompatibilityConfig({
  input: './index.html',
  extensions: ['.js', '.ts']
});

export default configs;
