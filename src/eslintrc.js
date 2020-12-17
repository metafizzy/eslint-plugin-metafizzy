// Config used for exported plugin

module.exports = {
  env: {
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 6,
  },
  globals: {
  },
  ignorePatterns: [
    'build/',
    'dist/',
    '!.eslintrc.js',
  ],
  rules: {
    'accessor-pairs': 'error',
    'array-bracket-spacing': [ 'error', 'always' ],
    'array-callback-return': 'error',
    'array-element-newline': 'off',
    'arrow-body-style': [ 'error', 'as-needed' ],
    'arrow-parens': [ 'error', 'always' ],
    'arrow-spacing': 'error',
    'block-scoped-var': 'error',
    'block-spacing': 'error',
    'brace-style': [ 'error', '1tbs' ],
    camelcase: 'error',
    'callback-return': 'error',
    'class-methods-use-this': 'error',
    'comma-dangle': [ 'error', 'always-multiline' ],
    'comma-spacing': 'error',
    'comma-style': [ 'error', 'last' ],
    complexity: [ 'error', 12 ],
    'computed-property-spacing': 'off',
    'consistent-this': [ 'error', '_this' ],
    curly: [ 'error', 'multi-line' ],
    'default-case': 'error',
    'dot-location': [ 'error', 'property' ],
    'dot-notation': 'error',
    'eol-last': 'error',
    eqeqeq: 'off',
    'func-call-spacing': 'error',
    'func-name-matching': 'error',
    'func-style': [ 'error', 'declaration' ],
    'function-paren-newline': [ 'error', 'consistent' ],
    'generator-star-spacing': 'error',
    'handle-callback-err': 'error',
    'id-blacklist': [ 'error', 'callback' ],
    'id-length': [ 'error', {
      min: 2,
      max: 30,
      exceptions: [ 'x', 'y', 'z', 'i', 'j', 'a', 'b', 't' ],
    } ],
    'id-match': 'error',
    'implicit-arrow-linebreak': 'error',
    indent: [ 'error', 2, {
      VariableDeclarator: 4,
      CallExpression: { arguments: 2 },
      FunctionExpression: { body: 1, parameters: 2 },
      ignoredNodes: [ 'CallExpression > FunctionExpression > BlockStatement.body' ],
    } ],
    'key-spacing': 'error',
    'keyword-spacing': [ 'error', {
      before: true,
      after: true,
    } ],
    'linebreak-style': [ 'error', 'unix' ],
    'lines-around-comment': 'error',
    'lines-between-class-members': 'error',
    'max-classes-per-file': 'error',
    'max-depth': 'error',
    'max-len': [ 'error', {
      code: 90,
    } ],
    'max-params': [ 'error', {
      max: 4,
    } ],
    'max-nested-callbacks': 'error',
    'max-statements-per-line': 'error',
    'new-cap': 'error',
    'new-parens': 'error',
    'newline-per-chained-call': 'error',
    'no-alert': 'error',
    'no-array-constructor': 'error',
    'no-async-promise-executor': 'error',
    'no-await-in-loop': 'error',
    'no-bitwise': 'error',
    'no-buffer-constructor': 'error',
    'no-caller': 'error',
    'no-catch-shadow': 'error',
    'no-confusing-arrow': 'error',
    'no-continue': 'off',
    'no-div-regex': 'error',
    'no-duplicate-imports': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-extra-parens': [ 'error', 'all', {
      nestedBinaryExpressions: false,
    } ],
    'no-floating-decimal': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-inner-declarations': [ 'error', 'functions' ],
    'no-invalid-this': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-magic-numbers': 'off',
    'no-misleading-character-class': 'error',
    'no-mixed-requires': 'error',
    'no-multi-assign': 'off',
    'no-multi-spaces': [ 'error', {
      exceptions: { Property: true },
    } ],
    'no-multi-str': 'error',
    'no-multiple-empty-lines': [ 'error', {
      max: 1,
    } ],
    'no-native-reassign': 'error',
    'no-negated-condition': 'off',
    'no-negated-in-lhs': 'error',
    'no-nested-ternary': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-require': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': 'off',
    'no-path-concat': 'error',
    'no-process-env': 'error',
    'no-process-exit': 'error',
    'no-proto': 'error',
    'no-prototype-builtins': 'error',
    'no-restricted-globals': 'error',
    'no-restricted-imports': 'error',
    'no-restricted-modules': 'error',
    'no-restricted-properties': 'error',
    'no-restricted-syntax': 'error',
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow': 'error',
    'no-shadow-restricted-names': 'error',
    'no-spaced-func': 'error',
    'no-tabs': 'error',
    'no-template-curly-in-string': 'error',
    'no-ternary': 'off',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-undefined': 'off',
    'no-underscore-dangle': 'off',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': 'error',
    'no-unused-expressions': 'error',
    'no-use-before-define': [ 'error', {
      functions: false,
    } ],
    'no-useless-call': 'error',
    'no-useless-catch': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-void': 'error',
    'no-warning-comments': 'off',
    'no-whitespace-before-property': 'error',
    'no-with': 'error',
    'nonblock-statement-body-position': 'error',
    'object-curly-newline': 'error',
    'object-curly-spacing': [ 'error', 'always' ],
    'one-var': [ 'error', {
      initialized: 'never',
      uninitialized: 'consecutive',
    } ],
    'one-var-declaration-per-line': [ 'error', 'initializations' ],
    'operator-assignment': 'error',
    'operator-linebreak': [ 'error', 'after' ],
    'padded-blocks': 'off',
    'padding-line-between-statements': 'error',
    'prefer-arrow-callback': 'off',
    'prefer-numeric-literals': 'error',
    'prefer-object-spread': 'off',
    'prefer-promise-reject-errors': 'error',
    'prefer-spread': 'error',
    'quote-props': [ 'error', 'as-needed' ],
    quotes: [ 'error', 'single', {
      avoidEscape: true,
    } ],
    radix: 'error',
    'require-atomic-updates': 'error',
    'require-await': 'error',
    'rest-spread-spacing': 'error',
    semi: 'error',
    'semi-spacing': [ 'error', {
      after: true,
      before: false,
    } ],
    'semi-style': [ 'error', 'last' ],
    'sort-imports': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': [ 'error', 'never' ],
    'space-in-parens': 'off',
    'space-infix-ops': 'off',
    'space-unary-ops': 'error',
    'spaced-comment': [ 'error', 'always', {
      exceptions: [ '-', '!' ],
    } ],
    strict: [ 'error', 'never' ],
    'switch-colon-spacing': 'error',
    'symbol-description': 'error',
    'template-curly-spacing': 'error',
    'template-tag-spacing': 'error',
    'unicode-bom': [ 'error', 'never' ],
    'valid-jsdoc': [ 'error', {
      requireParamDescription: false,
      requireReturn: false,
      requireReturnDescription: false,
    } ],
    'vars-on-top': 'off',
    'wrap-iife': [ 'error', 'any' ],
    'wrap-regex': 'error',
    'yield-star-spacing': 'error',
    yoda: [ 'error', 'never' ],
  },
};
