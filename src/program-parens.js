function create( context ) {

  let sourceCode = context.getSourceCode();

  function reportProgram( node ) {

    let tokens = sourceCode.tokensAndComments;
    sourceCode.tokensAndComments.forEach( function( token, i ) {
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
            messageId: 'rejectedOpeningSpace',
            fix: function( fixer ) {
              return fixer.removeRange([ openParen.range[1], closeParen.range[0] ]);
            }
          });
        }
        return;
      }

      let nextToken = sourceCode.getTokenAfter( openParen );
      let penultimateToken = sourceCode.getTokenBefore( closeParen );
      let isSingleString = tokenDelta == 2 && nextToken.type == 'String';

      let isNextOpeningBrace = tokenDelta > 2 && nextToken.type == 'Punctuator' &&
      ( nextToken.value == '[' || nextToken.value == '{' );
      let isSingleBracer;

      if ( isNextOpeningBrace ) {
        // check for single array or object
        let closingBrace = getMatchingClosingBrace( nextToken, tokens );
        isSingleBracer = sourceCode.getTokenAfter( closingBrace ) == closeParen;
      }

      // check for single string next
      if ( isSingleString || isSingleBracer ) {
        let hasOpeningSpace = sourceCode.isSpaceBetweenTokens( openParen, nextToken );
        if ( hasOpeningSpace ) {
          context.report({
            node: node,
            loc: openParen.loc,
            messageId: 'rejectedOpeningSpace',
            fix: function( fixer ) {
              return fixer.removeRange([ openParen.range[1], nextToken.range[0] ]);
            }
          });
        }

        let hasClosingSpace = sourceCode.isSpaceBetweenTokens(
            penultimateToken, closeParen );
        if ( hasClosingSpace ) {
          context.report({
            node: node,
            loc: closeParen.loc,
            messageId: 'rejectedClosingSpace',
            fix: function( fixer ) {
              return fixer.removeRange([ penultimateToken.range[1], closeParen.range[0] ]);
            }
          });
        }
        return;
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

function getMatchingClosingBrace( token, tokens ) {
  let openChar = token.value;
  let closeChar = matchingClosingBraces[ token.value ];
  let index = tokens.indexOf( token ) + 1;
  let openCount = 1;

  for ( var i = index; i < tokens.length; i++ ) {
    let token = tokens[i];
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
