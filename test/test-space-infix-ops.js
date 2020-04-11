const { RuleTester } = require('eslint');

const rule = require('../src/space-infix-ops.js');

function getBeforeAfterErrors( prefix, operator, column ) {
  return [
    { messageId: `${prefix}SpaceBefore`, data: { operator }, column },
    { messageId: `${prefix}SpaceAfter`, data: { operator }, column },
  ];
}

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

    // LogicalExpression
    'a || b',
    'a && b',

    // VariableDeclarator
    'var a = b',
    'var a = b, c = d',

    // AssignmentExpression
    'a += 1',

    // ConditionalExpression, aka ternary
    'a ? b : c',

    // AssignmentPattern
    { code: 'var { a = 0 } = bar;', parserOptions: { ecmaVersion: 6 } },
    { code: 'function foo( a = 0 ) {}', parserOptions: { ecmaVersion: 6 } },
  ],
  invalid: [
    {
      code: 'a+b',
      output: 'a + b',
      errors: getBeforeAfterErrors( 'missing', '+', 2 ),
    },
    {
      code: 'Math.PI/4',
      output: 'Math.PI / 4',
      errors: getBeforeAfterErrors( 'missing', '/', 8 ),
    },
    // BinaryExpression, multiply/divide exception
    {
      code: '1 / 12',
      output: '1/12',
      errors: getBeforeAfterErrors( 'unexpected', '/', 3 ),
    },
    {
      code: 'TAU / 4',
      output: 'TAU/4',
      errors: getBeforeAfterErrors( 'unexpected', '/', 5 ),
    },
    {
      code: 'TAU * 2',
      output: 'TAU*2',
      errors: getBeforeAfterErrors( 'unexpected', '*', 5 ),
    },
    // LogicalExpression
    {
      code: 'a||b',
      output: 'a || b',
      errors: getBeforeAfterErrors( 'missing', '||', 2 ),
    },
    // VariableDeclarator
    {
      code: 'var a=b',
      output: 'var a = b',
      errors: getBeforeAfterErrors( 'missing', '=', 6 ),
    },
    {
      code: 'var a = b, c=d',
      output: 'var a = b, c = d',
      errors: getBeforeAfterErrors( 'missing', '=', 13 ),
    },
    // AssignmentExpression
    {
      code: 'a+=1',
      output: 'a += 1',
      errors: getBeforeAfterErrors( 'missing', '+=', 2 ),
    },
    // ConditionalExpression
    {
      code: 'a?b:c',
      output: 'a ? b : c',
      errors: getBeforeAfterErrors( 'missing', '?', 2 ).concat(
          getBeforeAfterErrors( 'missing', ':', 4 ),
      ),
    },
    // AssignmentPattern
    {
      code: 'var { a=0 } = bar;',
      output: 'var { a = 0 } = bar;',
      parserOptions: { ecmaVersion: 6 },
      errors: getBeforeAfterErrors( 'missing', '=', 8 ),
    },
    {
      code: 'function foo( a=0 ) {}',
      output: 'function foo( a = 0 ) {}',
      parserOptions: { ecmaVersion: 6 },
      errors: getBeforeAfterErrors( 'missing', '=', 16 ),
    },
  ],
} );
