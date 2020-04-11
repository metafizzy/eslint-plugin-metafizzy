const { RuleTester } = require('eslint');

/* eslint-disable-next-line no-unused-vars */
function create( context ) {
  return {
    BinaryExpression: function( node ) {
      console.log( node );
    },
  };
}

const rule = {
  meta: {
    type: 'layout',
    fixable: 'whitespace',

    messages: {
      missingOpeningSpace: 'There must be a space after this paren.',
      missingClosingSpace: 'There must be a space before this paren.',
      rejectedOpeningSpace: 'There should be no space after this paren.',
      rejectedClosingSpace: 'There should be no space before this paren.',
    },
  },

  create: create,
};

let tester = new RuleTester();
tester.run( 'scratch', rule, {
  valid: [
    'TAU * 2/5',
  ],
  invalid: [],
} );
