// ESLint config just for checking this project

let baseConfig = require('./src/eslintrc.js');

// should match node config in src/index.js
module.exports = {
  ...baseConfig,
  env: {
    ...baseConfig.env,
    node: true,
  },
  parserOptions: {
    ...baseConfig.parseOptions,
    ecmaVersion: 2019,
  },
  rules: {
    ...baseConfig.rules,
    'prefer-object-spread': 'error',
  },
};
