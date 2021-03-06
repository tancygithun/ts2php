import * as ts from 'typescript';

/**
 * Gets a custom text range to use when emitting comments.
 */
export function getStartsOnNewLine(node: ts.Node) {
    const emitNode = node.emitNode;
    return emitNode && emitNode.startsOnNewLine;
}
