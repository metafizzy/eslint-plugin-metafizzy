const { RuleTester } = require('eslint');

const rule = require('../src/program-parens.js');

let tester = new RuleTester();

tester.run( 'spaces-in-parens-fizzy', rule, {
  valid: [
    { code: 'getItem()' },
    // { code: 'getItem( a, b )' },
    // { code: 'getItem(\na, b\n)' },
    { code: 'getItem("hydrogen")' },
    // { code: 'getItem( [ x, y ] )' },
    // { code: 'getItem({ bloodType: "AB Positive" })' },
    // { code: 'getItem({\nbloodType: "AB Positive"\n})' },
    // { code: 'getItem( element )' },
    // { code: 'new Item( a, b )' },
    // { code: 'new Item( element )' },
    // { code: 'new Item("hydrogen")' },
  ],
  invalid: [
    {
      code: 'getItem( )',
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 8 },
      ]
    },
    // {
    //   code: 'getItem(a, b)',
    //   errors: [
    //     { messageId: "missingOpeningSpace", line: 1, column: 8 },
    //     { messageId: "missingClosingSpace", line: 1, column: 13 },
    //   ]
    // },
    // {
    //   code: 'new Item(a, b)',
    //   errors: [
    //     { messageId: "missingOpeningSpace", line: 1, column: 9 },
    //     { messageId: "missingClosingSpace", line: 1, column: 14 },
    //   ]
    // },
    // {
    //   code: 'getItem( "hydrogen" )',
    //   errors: [
    //     { messageId: "rejectedOpeningSpace", line: 1, column: 8 },
    //     { messageId: "rejectedClosingSpace", line: 1, column: 21 },
    //   ]
    // },
    // {
    //   code: 'new Item( "hydrogen" )',
    //   errors: [
    //     { messageId: "rejectedOpeningSpace", line: 1, column: 9 },
    //     { messageId: "rejectedClosingSpace", line: 1, column: 22 },
    //   ]
    // },
    // {
    //   code: 'getItem( [ x, y ] )',
    //   errors: [
    //     { messageId: "rejectedOpeningSpace", line: 1, column: 8 },
    //     { messageId: "rejectedClosingSpace", line: 1, column: 19 },
    //   ]
    // },
    // {
    //   code: 'getItem( { bloodType: "AB Positive" } )',
    //   errors: [
    //     { messageId: "rejectedOpeningSpace", line: 1, column: 8 },
    //     { messageId: "rejectedClosingSpace", line: 1, column: 39 },
    //   ]
    // },
    // {
    //   code: 'getItem(element)',
    //   errors: [
    //     { messageId: "missingOpeningSpace", line: 1, column: 8 },
    //     { messageId: "missingClosingSpace", line: 1, column: 16 },
    //   ]
    // },
  ],
} );
