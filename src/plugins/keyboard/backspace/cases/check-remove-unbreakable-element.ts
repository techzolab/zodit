/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import type { IZodit } from 'zodit/types';
import { Dom } from '../../../../core/dom';
import { INSEPARABLE_TAGS } from '../../../../core/constants';
import { checkRemoveEmptyParent } from './check-remove-empty-parent';

/**
 * Check possibility inseparable Element can be removed (img, hr etc.)
 *
 * @example
 * ```html
 * <p>first second <img>| stop</p>
 * ```
 * result
 * ```html
 * <p>first second | stop</p>
 * ```
 *
 * @private
 */
export function checkRemoveUnbreakableElement(
	zodit: IZodit,
	fakeNode: Node,
	backspace: boolean
): boolean {
	const neighbor = Dom.findSibling(fakeNode, backspace);

	if (
		Dom.isElement(neighbor) &&
		(Dom.isTag(neighbor, INSEPARABLE_TAGS) || Dom.isEmpty(neighbor))
	) {
		Dom.safeRemove(neighbor);
		zodit.s.setCursorBefore(fakeNode);

		if (Dom.isTag(neighbor, 'br')) {
			checkRemoveEmptyParent(zodit, fakeNode, backspace);
		}

		return true;
	}

	return false;
}
