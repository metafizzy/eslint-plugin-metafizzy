function create( context ) {

  let sourceCode = context.getSourceCode();

  function checkOperator( node, leftNode, operatorValue, rightNode ) {
    let operator = sourceCode.getFirstTokenBetween( leftNode, rightNode,
      function( token ) {
        return token.value == operatorValue;
      }
    );

    let before = sourceCode.getTokenBefore( operator );
    let after = sourceCode.getTokenAfter( operator );
    let hasSpaceBefore = sourceCode.isSpaceBetweenTokens( before, operator );
    let hasSpaceAfter = sourceCode.isSpaceBetweenTokens( operator, after );

    let isMultiplyDivide = node.type == 'BinaryExpression' &&
      [ '/', '*' ].includes( operatorValue );
    let isSingularMultiplyDivide =  isMultiplyDivide && getIsSingular( leftNode ) &&
      getIsSingular( rightNode );

    function report( options ) {
      context.report( Object.assign( {
        node: node,
        data: { operator: operatorValue },
        loc: operator.loc,
      }, options ) );
    }

    if ( isSingularMultiplyDivide ) {
      if ( hasSpaceBefore ) {
        report({
          messageId: 'unexpectedSpaceBefore',
          fix: function( fixer ) {
            return fixer.removeRange([ before.range[1], operator.range[0] ]);
          }
        });
      }
      if ( hasSpaceAfter ) {
        report({
          messageId: 'unexpectedSpaceAfter',
          fix: function( fixer ) {
            return fixer.removeRange([ operator.range[1], after.range[0] ]);
          }
        });
      }
    } else {
      // everything else require spaces
      if ( !hasSpaceBefore ) {
        report({
          messageId: 'missingSpaceBefore',
          fix: function( fixer ) {
            return fixer.insertTextBefore( operator, ' ' );
          }
        });
      }
      if ( !hasSpaceAfter ) {
        report({
          messageId: 'missingSpaceAfter',
          fix: function( fixer ) {
            return fixer.insertTextAfter( operator, ' ' );
          }
        });
      }

    }

  }

  function checkBinary( node ) {
    checkOperator( node, node.left, node.operator, node.right );
  }

  function checkVar( node ) {
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
      missingSpaceBefore: 'Space missing before `{{operator}}`',
      missingSpaceAfter: 'Space missing after `{{operator}}`',
      unexpectedSpaceBefore: 'Unexpected space before `{{operator}}`',
      unexpectedSpaceAfter: 'Unexpected space after `{{operator}}`'
    },
  },

  create: create,
};
