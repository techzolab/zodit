/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/keyboard
 */

import type { Nullable } from 'zodit/types';
import { call } from 'zodit/core/helpers/utils';
import { Dom } from 'zodit/core/dom';
import { trim } from 'zodit/core/helpers/string';

/**
 * Returns the nearest non-empty neighbor
 */
export function findNotEmptyNeighbor(
	node: Node,
	left: boolean,
	root: HTMLElement
): Nullable<Node> {
	return call(
		left ? Dom.prev : Dom.next,
		node,
		n => Boolean(n && (!Dom.isText(n) || trim(n?.nodeValue || '').length)),
		root
	);
}

/**
 * Returns the nearest non-empty sibling
 */
export function findNotEmptySibling(
	node: Node,
	backspace: boolean
): Nullable<Node> {
	return Dom.findSibling(node, backspace, n => {
		return (
			!Dom.isEmptyTextNode(n) &&
			Boolean(
				!Dom.isText(n) || (n.nodeValue?.length && trim(n.nodeValue))
			)
		);
	});
}

/**
 * Finds the nearest neighbor that would be in the maximum nesting depth.
 * Ie if neighbor `<DIV><SPAN>Text` then return Text node.
 */
export function findMostNestedNeighbor(
	node: Node,
	right: boolean,
	root: HTMLElement,
	onlyInlide: boolean = false
): Nullable<Node> {
	const nextChild = (node: Node): Nullable<Node> =>
		right ? node.firstChild : node.lastChild;

	let next = findNotEmptyNeighbor(node, !right, root);

	if (onlyInlide && Dom.isElement(next) && !Dom.isInlineBlock(next)) {
		return null;
	}

	if (next) {
		do {
			if (nextChild(next)) {
				next = nextChild(next);
			} else {
				return next;
			}
		} while (next);
	}

	return null;
}
