import { createCompatibilityConfig } from '@open-wc/building-rollup';

export default createCompatibilityConfig({
  input: './index.html',
  extensions: ['.js', '.ts']
});
