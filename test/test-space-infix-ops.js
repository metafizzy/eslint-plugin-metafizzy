const { RuleTester } = require('eslint');

const rule = require('../src/space-infix-ops.js');

let tester = new RuleTester();

tester.run( 'space-infix-ops', rule, {
  valid: [
    // BinaryExpression
    'a + b',
    'Math.PI / 4',

    // BinaryExpression, multiply/divide exception
    '1/12',
    'TAU/4',
    'PI*2',

    // AssignmentExpression
    'a += 1',

    // Logical Expression
    'a || b',
    'a && b',

    // AssignmentPattern
    { parserOptions: { ecmaVersion: 6 }, code: "var { a = 0 } = bar;" },
    { parserOptions: { ecmaVersion: 6 }, code: "function foo( a = 0 ) {}" },
  ],
  invalid: [
    {
      code: 'a+b',
      output: 'a + b',
      errors: [
        { messageId: "missingBeforeSpace", line: 1, column: 2 },
        { messageId: "missingAfterSpace", line: 1, column: 2 },
      ]
    },
    {
      code: 'Math.PI/4',
      output: 'Math.PI / 4',
      errors: [
        { messageId: "missingBeforeSpace", line: 1, column: 8 },
        { messageId: "missingAfterSpace", line: 1, column: 8 },
      ]
    },
    {
      code: '1 / 12',
      output: '1/12',
      errors: [
        { messageId: "rejectedBeforeSpace", line: 1, column: 3 },
        { messageId: "rejectedAfterSpace", line: 1, column: 3 },
      ]
    },
    {
      code: 'TAU / 4',
      output: 'TAU/4',
      errors: [
        { messageId: "rejectedBeforeSpace", line: 1, column: 5 },
        { messageId: "rejectedAfterSpace", line: 1, column: 5 },
      ]
    },
    {
      code: 'TAU * 2',
      output: 'TAU*2',
      errors: [
        { messageId: "rejectedBeforeSpace", line: 1, column: 5 },
        { messageId: "rejectedAfterSpace", line: 1, column: 5 },
      ]
    },
    {
      code: 'a+=1',
      output: 'a += 1',
      errors: [
        { messageId: "missingBeforeSpace", line: 1, column: 2 },
        { messageId: "missingAfterSpace", line: 1, column: 2 },
      ]
    },
    {
      code: 'a||b',
      output: 'a || b',
      errors: [
        { messageId: "missingBeforeSpace", line: 1, column: 2 },
        { messageId: "missingAfterSpace", line: 1, column: 2 },
      ]
    },
  ],
} );
