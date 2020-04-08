const { RuleTester } = require('eslint');

let rule = {
  meta: {
    type: "layout",
    fixable: 'whitespace',

    messages: {
      missingOpeningSpace: "There must be a space after this paren.",
      missingClosingSpace: "There must be a space before this paren.",
      rejectedOpeningSpace: "There should be no space after this paren.",
      rejectedClosingSpace: "There should be no space before this paren."
    },
  },

  create: function( context ) {
    const sourceCode = context.getSourceCode();

    return {
      CallExpression: function( node ) {
        // no arguments
        if ( node.arguments.length == 0 ) {
          return;
        }

        let firstArg = node.arguments[0];
        let firstArgToken = sourceCode.getFirstToken( firstArg );
        let openParen = sourceCode.getTokenBefore( firstArgToken );
        let lastArgIndex = node.arguments.length - 1;
        let lastArgToken = sourceCode.getLastToken( node.arguments[ lastArgIndex ] );
        let closeParen = sourceCode.getTokenAfter( lastArgToken );
        let hasOpeningSpace = sourceCode.isSpaceBetweenTokens(openParen, firstArgToken);
        let hasClosingSpace = sourceCode.isSpaceBetweenTokens(lastArgToken, closeParen);

        // one argument
        if ( node.arguments.length == 1 ) {
          // console.log(node.arguments[ lastArgIndex ]);
          if ( firstArgToken.type == 'String' || firstArg.type == 'ArrayExpression' ) {
            if ( hasOpeningSpace ) {
              context.report({
                node: node,
                loc: openParen.loc,
                messageId: 'rejectedOpeningSpace',
                fix: function( fixer ) {
                  return fixer.removeRange([ openParen.range[1], firstArgToken.range[0] ]);
                }
              });
            }
            if ( hasClosingSpace ) {
              context.report({
                node: node,
                loc: closeParen.loc,
                messageId: 'rejectedClosingSpace',
                fix: function( fixer ) {
                  return fixer.removeRange([ lastArgToken.range[1], closeParen.range[0] ]);
                }
              });
            }
          }
          return;
        }

        // 2 more args -> needs spaces
        if ( !hasOpeningSpace ) {
          context.report({
            node: node,
            loc: openParen.loc,
            messageId: "missingOpeningSpace",
            fix: function( fixer ) {
              return fixer.insertTextAfter(openParen, ' ');
            }
          });
        }
        if ( !hasClosingSpace ) {
          context.report({
            node: node,
            loc: closeParen.loc,
            messageId: "missingClosingSpace",
            fix: function( fixer ) {
              return fixer.insertTextAfter(lastArgToken, ' ');
            }
          });
        }
      }
    };
  }
};

let tester = new RuleTester();

tester.run('spaces-in-parens-fizzy', rule, {
  valid: [
    { code: 'getItem( a, b )' },
    { code: 'getItem(\na, b\n)' },
    { code: 'getItem("hydrogen")' },
    { code: 'getItem([ x, y ])' },
  ],
  invalid: [
    {
      code: 'getItem(a, b)',
      errors: [
        { messageId: "missingOpeningSpace", line: 1, column: 8 },
        { messageId: "missingClosingSpace", line: 1, column: 13 },
      ]
    },
    {
      code: 'getItem( "hydrogen" )',
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 8 },
        { messageId: "rejectedClosingSpace", line: 1, column: 21 },
      ]
    },
    {
      code: 'getItem( [ x, y ] )',
      errors: [
        { messageId: "rejectedOpeningSpace", line: 1, column: 8 },
        { messageId: "rejectedClosingSpace", line: 1, column: 19 },
      ]
    },
  ],
});