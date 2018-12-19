/**
 * @file json
 * @author cxtom(cxtom2008@gmail.com)
 */

import {
    EmitHint,
    CallExpression,
    createIdentifier,
    createLiteral,
    createNodeArray,
    PropertyAccessExpression,
    ListFormat
} from 'typescript';

import {
    isPropertyAccessExpression,
    isIdentifier,
    isCallExpression
} from '../utilities/nodeTest';


const methods = {
    stringify(node: CallExpression, {emitExpressionList, writePunctuation}) {
        const expNode = node.expression as PropertyAccessExpression;
        writePunctuation('json_encode');
        node.arguments = createNodeArray([
            node.arguments[0],
            // JSON_UNESCAPED_UNICODE
            createLiteral(256)
        ]);
        emitExpressionList(node, node.arguments, ListFormat.CallExpressionArguments);
    },
    parse(node: CallExpression, {emitExpressionList, writePunctuation}) {
        const expNode = node.expression as PropertyAccessExpression;
        writePunctuation('json_decode');
        node.arguments = createNodeArray([
            node.arguments[0],
            createLiteral(true)
        ]);
        emitExpressionList(node, node.arguments, ListFormat.CallExpressionArguments);
    }
};

export default {

    emit(hint, node, helpers) {

        const expNode = node.expression;
        let func;

        if (
            hint === EmitHint.Expression
            && isCallExpression(node)
            && isPropertyAccessExpression(expNode)
            && isIdentifier(expNode.expression)
            && expNode.expression.escapedText === 'JSON'
            && (func = methods[helpers.getTextOfNode(expNode.name)])
        ) {
            return func(node, helpers);
        }

        return false;
    }
};