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
        { messageId: 'unexpectedOpeningSpace', column: 6 },
        { messageId: 'unexpectedClosingSpace', column: 19 },
      ],
    },
    {
      code: 'items[ 1 ]',
      output: 'items[1]',
      errors: [
        { messageId: 'unexpectedOpeningSpace', column: 6 },
        { messageId: 'unexpectedClosingSpace', column: 10 },
      ],
    },
    {
      code: 'items[ i ]',
      output: 'items[i]',
      errors: [
        { messageId: 'unexpectedOpeningSpace', column: 6 },
        { messageId: 'unexpectedClosingSpace', column: 10 },
      ],
    },
    {
      code: 'items[index]',
      output: 'items[ index ]',
      errors: [
        { messageId: 'missingOpeningSpace', column: 6 },
        { messageId: 'missingClosingSpace', column: 12 },
      ],
    },
    {
      code: 'items[10 + 4]',
      output: 'items[ 10 + 4 ]',
      errors: [
        { messageId: 'missingOpeningSpace', column: 6 },
        { messageId: 'missingClosingSpace', column: 13 },
      ],
    },
  ],
} );
