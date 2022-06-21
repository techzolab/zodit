/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/fix/clean-html
 */

import type { IZodit, Nullable } from 'zodit/types';
import { INVISIBLE_SPACE_REG_EXP as INV_REG } from 'zodit/core/constants';
import { Dom } from 'zodit/core/dom/dom';

/**
 * @private
 */
export function removeInvTextNodes(
	zodit: IZodit,
	node: Node,
	hadEffect: boolean,
	arg: unknown,
	argi: unknown,
	currentNode: Nullable<Node>
): boolean {
	if (!currentNode) {
		return hadEffect;
	}

	if (!Dom.isText(node) || node.nodeValue == null) {
		return hadEffect;
	}

	if (
		INV_REG().test(node.nodeValue) &&
		node.nodeValue.replace(INV_REG(), '').length !== 0
	) {
		node.nodeValue = node.nodeValue.replace(INV_REG(), '');

		if (node === currentNode && zodit.s.isCollapsed()) {
			zodit.s.setCursorAfter(node);
		}

		if (!node.nodeValue) {
			Dom.safeRemove(node);
		}

		return true;
	}

	return hadEffect;
}
