const { RuleTester } = require('eslint');

const rule = require('../src/computed-property-spacing.js');

let tester = new RuleTester();

tester.run( 'computed-property-spacing', rule, {
  valid: [
    'items["hydrogen"]',
    'items[1]',
    'items[i]',
    'items[ index ]',
    'items[ 10 + 4 ]',
    'items[ ( 10 + 4 ) ]',
    'items[ indicies[i] ]',
    'items[ "last" + "Index" ]',
  ],
  invalid: [
    {
      code: 'items[ "hydrogen" ]',
      output: 'items["hydrogen"]',
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 6 },
        { messageId: "rejectedClosingSpace", line: 1, column: 19 },
      ]
    },
    {
      code: 'items[ 1 ]',
      output: 'items[1]',
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 6 },
        { messageId: "rejectedClosingSpace", line: 1, column: 10 },
      ]
    },
    {
      code: 'items[ i ]',
      output: 'items[i]',
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 6 },
        { messageId: "rejectedClosingSpace", line: 1, column: 10 },
      ]
    },
    {
      code: 'items[index]',
      output: 'items[ index ]',
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 6 },
        { messageId: "missingClosingSpace", line: 1, column: 12 },
      ]
    },
    {
      code: 'items[10 + 4]',
      output: 'items[ 10 + 4 ]',
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 6 },
        { messageId: "missingClosingSpace", line: 1, column: 13 },
      ]
    },
  ],
} );
