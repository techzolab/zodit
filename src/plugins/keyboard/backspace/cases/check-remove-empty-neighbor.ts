/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import type { IZodit } from 'zodit/types';
import { Dom } from 'zodit/core/dom';
import { findNotEmptySibling } from 'zodit/plugins/keyboard/helpers';

/**
 * Check if it is possible to remove an empty adjacent element.
 *
 * @example
 * ```html
 * <p><br></p><p>|second stop</p>
 * ```
 * result
 * ```html
 * <p>|second stop</p>
 * ```
 * @private
 */
export function checkRemoveEmptyNeighbor(
	zodit: IZodit,
	fakeNode: Node,
	backspace: boolean
): boolean {
	const parent = Dom.closest(fakeNode, Dom.isElement, zodit.editor);

	if (!parent) {
		return false;
	}

	const neighbor = findNotEmptySibling(parent, backspace);

	if (neighbor && Dom.isEmpty(neighbor)) {
		Dom.safeRemove(neighbor);
		zodit.s.setCursorBefore(fakeNode);
		return true;
	}

	return false;
}
