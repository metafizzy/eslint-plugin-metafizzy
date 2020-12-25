/* eslint-disable no-template-curly-in-string */

const { RuleTester } = require('eslint');

const rule = require('./src/spaces-in-parens.js');

let tester = new RuleTester();
tester.run( 'scratch', rule, {
  valid: [
    {
      code: 'execSync(`cat ${paths.join(" ")} > ${distPath}`)',
      parserOptions: { ecmaVersion: 6 },
    },
  ],
  invalid: [],
} );
