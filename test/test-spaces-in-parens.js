/* eslint-disable no-template-curly-in-string */

const { RuleTester } = require('eslint');

const rule = require('../src/spaces-in-parens.js');

let tester = new RuleTester();

tester.run( 'spaces-in-parens', rule, {
  valid: [
    'getItem()',
    'getItem("hydrogen")',
    'new Item("hydrogen")',
    { code: 'getItem(`hydrogen`)', parserOptions: { ecmaVersion: 6 } },
    {
      code: 'console.log(`Hello ${recipient || "world"}`)',
      parserOptions: { ecmaVersion: 6 },
    },
    'getItem( "hydrogen", element )',

    'getItem([ x, y ])',
    'getItem({ bloodType: "AB Positive" })',
    'getItem({\nbloodType: "AB Positive"\n})',

    'getItem( a, b )',
    'getItem(\na, b\n)',
    'getItem( element )',
    'new Item( a, b )',
    'new Item( element )',
    'getItem( [ x, y ], [ u, v ] )',

    '( 1 + 2 )',
  ],
  invalid: [
    {
      code: 'getItem( )',
      output: 'getItem()',
      errors: [
        { messageId: 'unexpectedOpeningSpace', column: 8 },
      ],
    },
    {
      code: 'getItem( "hydrogen" )',
      output: 'getItem("hydrogen")',
      errors: [
        { messageId: 'unexpectedOpeningSpace', column: 8 },
        { messageId: 'unexpectedClosingSpace', column: 21 },
      ],
    },
    {
      code: 'new Item( "hydrogen" )',
      output: 'new Item("hydrogen")',
      errors: [
        { messageId: 'unexpectedOpeningSpace', column: 9 },
        { messageId: 'unexpectedClosingSpace', column: 22 },
      ],
    },
    {
      code: 'getItem( `hydrogen` )',
      output: 'getItem(`hydrogen`)',
      parserOptions: { ecmaVersion: 6 },
      errors: [
        { messageId: 'unexpectedOpeningSpace', column: 8 },
        { messageId: 'unexpectedClosingSpace', column: 21 },
      ],
    },
    {
      code: 'console.log( `Hello ${recipient || "world"}` )',
      output: 'console.log(`Hello ${recipient || "world"}`)',
      parserOptions: { ecmaVersion: 6 },
      errors: [
        { messageId: 'unexpectedOpeningSpace', column: 12 },
        { messageId: 'unexpectedClosingSpace', column: 46 },
      ],
    },
    {
      code: 'getItem( [ x, y ] )',
      output: 'getItem([ x, y ])',
      errors: [
        { messageId: 'unexpectedOpeningSpace', column: 8 },
        { messageId: 'unexpectedClosingSpace', column: 19 },
      ],
    },
    {
      code: 'getItem( { bloodType: "AB Positive" } )',
      output: 'getItem({ bloodType: "AB Positive" })',
      errors: [
        { messageId: 'unexpectedOpeningSpace', column: 8 },
        { messageId: 'unexpectedClosingSpace', column: 39 },
      ],
    },
    {
      code: 'getItem(a, b)',
      output: 'getItem( a, b )',
      errors: [
        { messageId: 'missingOpeningSpace', column: 8 },
        { messageId: 'missingClosingSpace', column: 13 },
      ],
    },
    {
      code: 'new Item(a, b)',
      output: 'new Item( a, b )',
      errors: [
        { messageId: 'missingOpeningSpace', column: 9 },
        { messageId: 'missingClosingSpace', column: 14 },
      ],
    },
    {
      code: 'getItem(element)',
      output: 'getItem( element )',
      errors: [
        { messageId: 'missingOpeningSpace', column: 8 },
        { messageId: 'missingClosingSpace', column: 16 },
      ],
    },
    {
      code: 'getItem([ x, y ], [ u, w ])',
      output: 'getItem( [ x, y ], [ u, w ] )',
      errors: [
        { messageId: 'missingOpeningSpace', column: 8 },
        { messageId: 'missingClosingSpace', column: 27 },
      ],
    },
    {
      code: '(1 + 2)',
      output: '( 1 + 2 )',
      errors: [
        { messageId: 'missingOpeningSpace', column: 1 },
        { messageId: 'missingClosingSpace', column: 7 },
      ],
    },
  ],
} );
