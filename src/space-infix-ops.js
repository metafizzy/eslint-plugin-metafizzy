function create( context ) {

  let sourceCode = context.getSourceCode();

  function checkBinary( node ) {

    let operator = sourceCode.getFirstTokenBetween( node.left, node.right,
      function( token ) {
        return token.value === node.operator;
      }
    );

    let before = sourceCode.getTokenBefore( operator );
    let after = sourceCode.getTokenAfter( operator );
    let hasSpaceBefore = sourceCode.isSpaceBetweenTokens( before, operator );
    let hasSpaceAfter = sourceCode.isSpaceBetweenTokens( operator, after );

    let isMultiplyDivide = [ '/', '*' ].includes( node.operator );
    let isSingularMultiplyDivide = node.type == 'BinaryExpression' && isMultiplyDivide &&
      getIsSingular( node.left ) && getIsSingular( node.right );

    if ( isSingularMultiplyDivide ) {
      if ( hasSpaceBefore ) {
        context.report({
          node: node,
          loc: operator.loc,
          messageId: 'rejectedBeforeSpace',
          fix: function( fixer ) {
            return fixer.removeRange([ before.range[1], operator.range[0] ]);
          }
        });
      }
      if ( hasSpaceAfter ) {
        context.report({
          node: node,
          loc: operator.loc,
          messageId: 'rejectedAfterSpace',
          fix: function( fixer ) {
            return fixer.removeRange([ operator.range[1], after.range[0] ]);
          }
        });
      }
    } else {
      // everything else require spaces
      if ( !hasSpaceBefore ) {
        context.report({
          node: node,
          loc: operator.loc,
          messageId: 'missingBeforeSpace',
          fix: function( fixer ) {
            return fixer.insertTextBefore( operator, ' ' );
          }
        });
      }
      if ( !hasSpaceAfter ) {
        context.report({
          node: node,
          loc: operator.loc,
          messageId: 'missingAfterSpace',
          fix: function( fixer ) {
            return fixer.insertTextAfter( operator, ' ' );
          }
        });
      }

    }

  }

  return {
    BinaryExpression: checkBinary,
    AssignmentExpression: checkBinary,
    LogicalExpression: checkBinary,
    // AssignmentPattern: checkAssignment,
    // ConditionalExpression: checkConditional,
    // VariableDeclarator: checkVar
  };
}

function getIsSingular( node ) {
  return [ 'Literal', 'Identifier' ].includes( node.type );
}

module.exports = {
  meta: {
    type: 'layout',
    fixable: 'whitespace',

    docs: {
      description: 'Enforce consistent spacing around operators',
      category: 'Stylistic Issues',
    },

    messages: {
      missingSpace: 'Operator must be spaced.',
      rejectedSpace: 'Operator must not be spaced.',
      missingBeforeSpace: 'There must be a space after the operator.',
      missingAfterSpace: 'There must be a space before the operator.',
      rejectedBeforeSpace: 'There should be no space before the operator.',
      rejectedAfterSpace: 'There should be no space before the operator.'
    },
  },

  create: create,
};
