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
      let closeParen = getMatchingClosingParen( tokens, i );
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

      // check for single string next
      
      if ( tokenDelta == 2 ) {
        console.log( tokens[ i + 1 ] );
      }

    });
  }

  return { Program: reportProgram };
}

function getIsOpeningParen( token ) {
  return token.type == 'Punctuator' && token.value == '(';
}

function getIsClosingParen( token ) {
  return token.type == 'Punctuator' && token.value == ')';
}

function getMatchingClosingParen( tokens, index ) {
  let openCount = 1;
  for ( var i = index + 1; i < tokens.length; i++ ) {
    let token = tokens[i];
    if ( getIsOpeningParen( token ) ) {
      openCount++;
    } else if ( getIsClosingParen( token ) ) {
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
