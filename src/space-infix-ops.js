function create( context ) {

  let sourceCode = context.getSourceCode();

  function checkOperator( node, leftNode, operatorValue, rightNode ) {
    let operator = sourceCode.getFirstTokenBetween( leftNode, rightNode,
        function( token ) {
          return token.value === operatorValue;
        } );

    let before = sourceCode.getTokenBefore( operator );
    let after = sourceCode.getTokenAfter( operator );
    let hasSpaceBefore = sourceCode.isSpaceBetweenTokens( before, operator );
    let hasSpaceAfter = sourceCode.isSpaceBetweenTokens( operator, after );

    let isDivide = node.type === 'BinaryExpression' && operatorValue === '/';
    let isSingularDivide = isDivide && getIsLeftSingular( leftNode ) &&
      getIsSingular( rightNode );

    function report( options ) {
      context.report( {
        ...options,
        node: node,
        data: { operator: operatorValue },
        loc: operator.loc,
      } );
    }

    if ( isSingularDivide ) {
      if ( hasSpaceBefore ) {
        report({
          messageId: 'unexpectedSpaceBefore',
          fix: function( fixer ) {
            return fixer.removeRange([ before.range[1], operator.range[0] ]);
          },
        });
      }
      if ( hasSpaceAfter ) {
        report({
          messageId: 'unexpectedSpaceAfter',
          fix: function( fixer ) {
            return fixer.removeRange([ operator.range[1], after.range[0] ]);
          },
        });
      }
    } else {
      // everything else require spaces
      if ( !hasSpaceBefore ) {
        report({
          messageId: 'missingSpaceBefore',
          fix: function( fixer ) {
            return fixer.insertTextBefore( operator, ' ' );
          },
        });
      }
      if ( !hasSpaceAfter ) {
        report({
          messageId: 'missingSpaceAfter',
          fix: function( fixer ) {
            return fixer.insertTextAfter( operator, ' ' );
          },
        });
      }

    }

  }

  function checkBinary( node ) {
    checkOperator( node, node.left, node.operator, node.right );
  }

  function checkVar( node ) {
    if ( !node.init ) {
      return;
    }
    let leftNode = node.id.typeAnnotation || node.id;
    checkOperator( node, leftNode, '=', node.init );
  }

  function checkTernary( node ) {
    checkOperator( node, node.test, '?', node.consequent );
    checkOperator( node, node.consequent, ':', node.alternate );
  }

  function checkAssignmentPattern( node ) {
    let leftNode = node.left.typeAnnotation || node.left;
    checkOperator( node, leftNode, '=', node.right );
  }

  return {
    BinaryExpression: checkBinary,
    LogicalExpression: checkBinary,
    VariableDeclarator: checkVar,
    AssignmentExpression: checkBinary,
    ConditionalExpression: checkTernary,
    AssignmentPattern: checkAssignmentPattern,
  };
}

function getIsSingular( node ) {
  return [ 'Literal', 'Identifier' ].includes( node.type ) ||
    ( node.type === 'UnaryExpression' && getIsSingular( node.argument ) );
}

function getIsLeftSingular( node ) {
  let isSingular = getIsSingular( node );
  if ( isSingular ) {
    return isSingular;
  }
  // check if left node is a binary expression for: `a * b/c`
  return node.type === 'BinaryExpression' && getIsSingular( node.right );
}

module.exports = {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    docs: {
      description: 'enforce spacing around operators',
      category: 'Stylistic Issues',
    },

    messages: {
      missingSpaceBefore: 'Space missing before `{{operator}}`',
      missingSpaceAfter: 'Space missing after `{{operator}}`',
      unexpectedSpaceBefore: 'Singular division values. Unexpected space before `/`',
      unexpectedSpaceAfter: 'Singular division values. Unexpected space after `/`',
    },
  },

  create: create,
};
