const { RuleTester } = require('eslint');
// Shim in astUtils https://github.com/eslint/eslint/issues/12714
const astUtils = require("eslint/lib/rules/utils/ast-utils");

let rule = {
  create: function( context ) {

    const sourceCode = context.getSourceCode();

    return {
      Program: function( node ) {
        let tokens = sourceCode.tokensAndComments;
        console.log(node);

        tokens.forEach( function( token, i ) {
          let prevToken = tokens[ i - 1 ];
          let nextToken = tokens[ i + 1 ];

          // if token is not an opening or closing paren token, do nothing
          let isOpeningParen = astUtils.isOpeningParenToken( token );
          let isClosingParen = astUtils.isClosingParenToken( token );
          if ( !isOpeningParen && !isClosingParen ) {
            return;
          }
          // console.log( token );
        });
      }
    };
  }
};



let tester = new RuleTester();

tester.run('spaces-in-parens-fizzy', rule, {
  valid: [
    { code: "getFoo(10)" },
  ],
  invalid: [],
});
