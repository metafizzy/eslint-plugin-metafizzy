const { RuleTester } = require('eslint');

const rule = require('../src/spaces-in-parens.js');

let tester = new RuleTester();

tester.run( 'spaces-in-parens', rule, {
  valid: [
    { code: 'getItem()' },
    { code: 'getItem("hydrogen")' },
    { code: 'new Item("hydrogen")' },
    { code: 'getItem([ x, y ])' },
    { code: 'getItem({ bloodType: "AB Positive" })' },
    { code: 'getItem({\nbloodType: "AB Positive"\n})' },

    { code: 'getItem( a, b )' },
    { code: 'getItem(\na, b\n)' },
    { code: 'getItem( element )' },
    { code: 'new Item( a, b )' },
    { code: 'new Item( element )' },
    { code: 'getItem( [ x, y ], [ u, v ] )' },

    { code: '( 1 + 2 )' },
  ],
  invalid: [
    {
      code: 'getItem( )',
      output: 'getItem()',
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 8 },
      ]
    },
    {
      code: 'getItem( "hydrogen" )',
      output: 'getItem("hydrogen")',
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 8 },
        { messageId: "rejectedClosingSpace", line: 1, column: 21 },
      ]
    },
    {
      code: 'new Item( "hydrogen" )',
      output: 'new Item("hydrogen")',
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 9 },
        { messageId: "rejectedClosingSpace", line: 1, column: 22 },
      ]
    },
    {
      code: 'getItem( [ x, y ] )',
      output: 'getItem([ x, y ])',
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 8 },
        { messageId: "rejectedClosingSpace", line: 1, column: 19 },
      ]
    },
    {
      code: 'getItem( { bloodType: "AB Positive" } )',
      output: 'getItem({ bloodType: "AB Positive" })',
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 8 },
        { messageId: "rejectedClosingSpace", line: 1, column: 39 },
      ]
    },
    {
      code: 'getItem(a, b)',
      output: 'getItem( a, b )',
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 8 },
        { messageId: "missingClosingSpace", line: 1, column: 13 },
      ]
    },
    {
      code: 'new Item(a, b)',
      output: 'new Item( a, b )',
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 9 },
        { messageId: "missingClosingSpace", line: 1, column: 14 },
      ]
    },
    {
      code: 'getItem(element)',
      output: 'getItem( element )',
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 8 },
        { messageId: "missingClosingSpace", line: 1, column: 16 },
      ]
    },
    {
      code: 'getItem([ x, y ], [ u, w ])',
      output: 'getItem( [ x, y ], [ u, w ] )',
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 8 },
        { messageId: "missingClosingSpace", line: 1, column: 27 },
      ]
    },
    {
      code: '(1 + 2)',
      output: '( 1 + 2 )',
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 1 },
        { messageId: "missingClosingSpace", line: 1, column: 7 },
      ]
    },
  ],
} );
