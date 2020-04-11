const config = require('../.eslint.json');

config.rules = {
  ...config.rules,
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
    standard: config,
  },
};
