const baseConfig = require('./eslintrc.js');

baseConfig.rules = {
  ...baseConfig.rules,
  'metafizzy/computed-property-spacing': 'error',
  'metafizzy/space-infix-ops': 'error',
  'metafizzy/spaces-in-parens': 'error',
};

module.exports = {
  rules: {
    'computed-property-spacing': require('./computed-property-spacing.js'),
    'space-infix-ops': require('./space-infix-ops.js'),
    'spaces-in-parens': require('./spaces-in-parens.js'),
  },
  configs: {
    base: baseConfig,

    browser: {
      ...baseConfig,
      env: {
        ...baseConfig.env,
        browser: true,
      },
    },

    node: {
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
    },
  },
};
