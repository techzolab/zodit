/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import type { IZodit } from 'zodit/types';
import { Dom } from '../../../../core/dom';
import { call } from '../../../../core/helpers';

/**
 * Try join two UL elements
 *
 * @example
 * ```html
 * <ul><li>one</li></ul>|<ol><li>two</li></ol>
 * ```
 * Result
 * ```html
 * <ul><li>one|</li><li>two</li></ul>
 * ```
 * @private
 */
export function checkJoinTwoLists(
	zodit: IZodit,
	fakeNode: Node,
	backspace: boolean
): boolean {
	const next = Dom.findSibling(fakeNode, backspace),
		prev = Dom.findSibling(fakeNode, !backspace);

	if (
		!Dom.closest(fakeNode, Dom.isElement, zodit.editor) &&
		Dom.isTag(next, ['ul', 'ol']) &&
		Dom.isTag(prev, ['ul', 'ol']) &&
		Dom.isTag(next.lastElementChild, 'li') &&
		Dom.isTag(prev.firstElementChild, 'li')
	) {
		const { setCursorBefore, setCursorAfter } = zodit.s;

		const target = next.lastElementChild,
			second = prev.firstElementChild;

		call(!backspace ? Dom.append : Dom.prepend, second, fakeNode);

		Dom.moveContent(prev, next, !backspace);
		Dom.safeRemove(prev);

		call(backspace ? Dom.append : Dom.prepend, target, fakeNode);
		call(backspace ? setCursorBefore : setCursorAfter, fakeNode);

		return true;
	}

	return false;
}
