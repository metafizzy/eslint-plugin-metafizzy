function create( context ) {

  let sourceCode = context.getSourceCode();

  function reportFunction( node ) {
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

    let isString = firstArgToken.type == 'String';
    let isArray = firstArg.type == 'ArrayExpression';
    let isObject = firstArg.type == 'ObjectExpression';
    // single argument that is either String, Array or Object
    let rejectsSpaces = node.arguments.length == 1 &&
      ( isString || isArray || isObject );

      if ( rejectsSpaces ) {
      // console.log(firstArg.type);
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
      return;
    }

    // otherwise... requires spaces
    // single identifier argument or multiple arguments
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

  return {
    CallExpression: reportFunction,
    NewExpression: reportFunction,
  };
}

module.exports = {
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
