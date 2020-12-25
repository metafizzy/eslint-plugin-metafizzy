function create( context ) {

  let sourceCode = context.getSourceCode();

  function reportProgram( node ) {

    let tokens = sourceCode.tokensAndComments;
    /* eslint complexity: [ "error", 20 ] */
    tokens.forEach( function( token, i ) {
      let isOpeningParen = getIsOpeningParen( token );
      if ( !isOpeningParen ) {
        return;
      }
      let openParen = token;
      let closeParen = getMatchingClosingBrace( token, tokens );
      let tokenDelta = tokens.indexOf( closeParen ) - i;

      let isEmpty = tokenDelta == 1;
      // empty parens have no space
      if ( isEmpty ) {
        let hasSpace = sourceCode.isSpaceBetweenTokens( openParen, closeParen );
        if ( hasSpace ) {
          context.report({
            node: node,
            loc: openParen.loc,
            messageId: 'unexpectedOpeningSpace',
            fix: function( fixer ) {
              return fixer.removeRange([ openParen.range[1], closeParen.range[0] ]);
            },
          });
        }
        return;
      }

      let nextToken = sourceCode.getTokenAfter( openParen );
      let penultimateToken = sourceCode.getTokenBefore( closeParen );
      let isSingleString = tokenDelta == 2 &&
        [ 'String', 'Template' ].includes( nextToken.type );

      let isNextOpeningBrace = tokenDelta > 2 && nextToken.type == 'Punctuator' &&
      ( nextToken.value == '[' || nextToken.value == '{' );
      let isSingleBracer;

      if ( isNextOpeningBrace ) {
        // check for single array or object
        let closingBrace = getMatchingClosingBrace( nextToken, tokens );
        isSingleBracer = sourceCode.getTokenAfter( closingBrace ) == closeParen;
      }

      let isNextTemplate = tokenDelta > 2 && nextToken.type == 'Template';
      if ( isNextTemplate ) {
        let closingTemplate = getMatchingClosingTemplate( nextToken, tokens );
        isSingleBracer = sourceCode.getTokenAfter( closingTemplate ) == closeParen;
      }

      let hasOpeningSpace = sourceCode.isSpaceBetweenTokens( openParen, nextToken );
      let hasClosingSpace = sourceCode.isSpaceBetweenTokens( penultimateToken,
          closeParen );

      // check for single string next
      if ( isSingleString || isSingleBracer ) {
        // single string, array or object rejects spaces
        if ( hasOpeningSpace ) {
          context.report({
            node: node,
            loc: openParen.loc,
            messageId: 'unexpectedOpeningSpace',
            fix: function( fixer ) {
              return fixer.removeRange([ openParen.range[1], nextToken.range[0] ]);
            },
          });
        }

        if ( hasClosingSpace ) {
          context.report({
            node: node,
            loc: closeParen.loc,
            messageId: 'unexpectedClosingSpace',
            fix: function( fixer ) {
              return fixer.removeRange([ penultimateToken.range[1],
                closeParen.range[0] ]);
            },
          });
        }
      } else {
        // everything else require spaces
        if ( !hasOpeningSpace ) {
          context.report({
            node: node,
            loc: openParen.loc,
            messageId: 'missingOpeningSpace',
            fix: function( fixer ) {
              return fixer.insertTextAfter( openParen, ' ' );
            },
          });
        }
        if ( !hasClosingSpace ) {
          context.report({
            node: node,
            loc: closeParen.loc,
            messageId: 'missingClosingSpace',
            fix: function( fixer ) {
              return fixer.insertTextAfter( penultimateToken, ' ');
            },
          });
        }
      }

    });
  }

  return { Program: reportProgram };
}

function getIsOpeningParen( token ) {
  return token.type == 'Punctuator' && token.value == '(';
}

const matchingClosingBraces = {
  '(': ')',
  '[': ']',
  '{': '}',
};

function getMatchingClosingBrace( openingToken, tokens ) {
  let openChar = openingToken.value;
  let closeChar = matchingClosingBraces[ openingToken.value ];
  let index = tokens.indexOf( openingToken ) + 1;
  let followingTokens = tokens.slice( index );
  let openCount = 1;

  for ( let token of followingTokens ) {
    let isOpeningBrace = token.type == 'Punctuator' && token.value == openChar;
    let isClosingBrace = token.type == 'Punctuator' && token.value == closeChar;
    if ( isOpeningBrace ) {
      openCount++;
    } else if ( isClosingBrace ) {
      openCount--;
    }

    if ( openCount == 0 ) {
      return token;
    }
  }
}

function getMatchingClosingTemplate( openingToken, tokens ) {
  let index = tokens.indexOf( openingToken ) + 1;
  let followingTokens = tokens.slice( index );

  for ( let token of followingTokens ) {
    let isClosingTemplate = token.type == 'Template' && token.value.endsWith('`');
    if (isClosingTemplate) return token;
  }
}

module.exports = {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    docs: {
      description: 'enforce spacing inside parentheses',
      category: 'Stylistic Issues',
    },

    messages: {
      missingOpeningSpace: 'Space missing after opening paren `(`',
      missingClosingSpace: 'Space missing before closing paren `)`',
      unexpectedOpeningSpace: 'Singular value in parens. Unexpected space after `(`',
      unexpectedClosingSpace: 'Singular value in parens. Unexpected space before `)`',
    },
  },

  create: create,
};
