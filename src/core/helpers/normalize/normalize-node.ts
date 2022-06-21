/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/normalize
 */

import { INVISIBLE_SPACE_REG_EXP } from 'zodit/core/constants';
import { Dom } from 'zodit/core/dom/dom';

export const normalizeNode = (node: Node | null): void => {
	if (!node) {
		return;
	}

	if (Dom.isText(node) && node.nodeValue != null && node.parentNode) {
		while (Dom.isText(node.nextSibling)) {
			if (node.nextSibling.nodeValue != null) {
				node.nodeValue += node.nextSibling.nodeValue;
			}

			node.nodeValue = node.nodeValue.replace(
				INVISIBLE_SPACE_REG_EXP(),
				''
			);

			Dom.safeRemove(node.nextSibling);
		}
	} else {
		normalizeNode(node.firstChild);
	}

	normalizeNode(node.nextSibling);
};
