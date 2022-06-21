/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/keyboard/enter
 */

import type { IZodit, Nullable } from 'zodit/types';
import * as consts from 'zodit/core/constants';
import { Dom } from 'zodit/core/dom/dom';

/**
 * Finds a suitable parent block container
 * @private
 */
export function getBlockWrapper(
	zodit: IZodit,
	current: Node | null,
	tagReg = consts.IS_BLOCK
): Nullable<HTMLElement> {
	let node = current;
	const root = zodit.editor;

	do {
		if (!node || node === root) {
			break;
		}

		if (tagReg.test(node.nodeName)) {
			if (Dom.isTag(node, 'li')) {
				return node;
			}

			return (
				getBlockWrapper(zodit, node.parentNode, /^li$/i) ||
				(node as HTMLElement)
			);
		}

		node = node.parentNode;
	} while (node && node !== root);

	return null;
}
