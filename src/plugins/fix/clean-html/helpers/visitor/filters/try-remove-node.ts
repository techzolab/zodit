/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/fix/clean-html
 */

import type { IDictionary, IZodit, Nullable } from 'zodit/types';
import { Dom } from 'zodit/core/dom/dom';
import { IS_INLINE } from 'zodit/core/constants';
import { trim } from 'zodit/core/helpers/string/trim';

export function tryRemoveNode(
	zodit: IZodit,
	nodeElm: Node,
	hadEffect: boolean,
	allowTags: IDictionary | false,
	denyTags: IDictionary | false,
	currentSelectionNode: Nullable<Node>
): boolean {
	if (
		isRemovableNode(
			zodit,
			nodeElm,
			currentSelectionNode,
			allowTags,
			denyTags
		)
	) {
		Dom.safeRemove(nodeElm);
		return true;
	}

	return hadEffect;
}

function isRemovableNode(
	zodit: IZodit,
	node: Node,
	current: Nullable<Node>,
	allow: IDictionary | false,
	deny: IDictionary | false
): boolean {
	if (
		!Dom.isText(node) &&
		((allow && !allow[node.nodeName]) || (deny && deny[node.nodeName]))
	) {
		return true;
	}

	return (
		zodit.o.cleanHTML.removeEmptyElements &&
		Dom.isElement(node) &&
		node.nodeName.match(IS_INLINE) != null &&
		!Dom.isTemporary(node) &&
		trim((node as Element).innerHTML).length === 0 &&
		(current == null || !Dom.isOrContains(node, current))
	);
}

// @ts-ignore
function removeExtraBR(
	zodit: IZodit,
	node: Node,
	current: Nullable<Node>
): boolean {
	// remove extra br
	if (
		Dom.isTag(node, 'br') &&
		hasNotEmptyTextSibling(node) &&
		!hasNotEmptyTextSibling(node, true) &&
		(current == null ||
			Dom.up(node, Dom.isBlock, zodit.editor) !==
				Dom.up(current, Dom.isBlock, zodit.editor))
	) {
		return true;
	}

	return false;
}

function hasNotEmptyTextSibling(node: Node, next = false): boolean {
	let prev = next ? node.nextSibling : node.previousSibling;

	while (prev) {
		if (Dom.isElement(prev) || !Dom.isEmptyTextNode(prev)) {
			return true;
		}

		prev = next ? prev.nextSibling : prev.previousSibling;
	}

	return false;
}
