const { RuleTester } = require('eslint');

function create( context ) {
  return {
    VariableDeclarator: function( node ) {
      console.log( node );
    }
  };
}

const rule = {
  meta: {
    type: "layout",
    fixable: 'whitespace',

    docs: {
      description: "enforce consistent spacing inside parentheses",
      category: "Stylistic Issues",
      recommended: false,
    },

    messages: {
      missingOpeningSpace: "There must be a space after this paren.",
      missingClosingSpace: "There must be a space before this paren.",
      rejectedOpeningSpace: "There should be no space after this paren.",
      rejectedClosingSpace: "There should be no space before this paren."
    },
  },

  create: create,
};

let tester = new RuleTester();
tester.run( 'scratch', rule, {
  valid: [
    'var a = b'
  ],
  invalid: [],
} );
