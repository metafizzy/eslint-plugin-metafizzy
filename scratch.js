const { RuleTester } = require('eslint');

function create( context ) {
  return {
    Program: function( node ) {
      // console.log( node );
      node.tokens.forEach( function( token ) {
        if ( token.value && token.value == '(' ) {
          console.log(token.parent);
        }
      })
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
    // { code: 'function getItem( hydrogen ) {}' },
    { code: 'getItem([ a, b ])' },
  ],
  invalid: [],
} );
