/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import type { IZodit } from 'zodit/types';
import { Dom } from 'zodit/core/dom';
import { call } from 'zodit/core/helpers/utils';

/**
 * For first item in list on backspace try move his content in new P
 *
 * @example
 * ```html
 * <ul><li>|first</li><li>second</li></ul>
 * ```
 * Result
 * ```html
 * <p>|first</p><ul><li>second</li></ul>
 * ```
 *
 * @private
 */
export function checkUnwrapFirstListItem(
	zodit: IZodit,
	fakeNode: Node,
	backspace: boolean
): boolean {
	const li = Dom.closest(fakeNode, Dom.isElement, zodit.editor);

	const { s } = zodit;

	if (
		Dom.isTag(li, 'li') &&
		li?.parentElement?.[
			backspace ? 'firstElementChild' : 'lastElementChild'
		] === li &&
		s.cursorInTheEdge(backspace, li)
	) {
		const ul = li.parentElement;
		const p = zodit.createInside.element(zodit.o.enterBlock);

		call(backspace ? Dom.before : Dom.after, ul, p);

		Dom.moveContent(li, p);
		Dom.safeRemove(li);

		if (Dom.isEmpty(ul)) {
			Dom.safeRemove(ul);
		}

		call(backspace ? s.setCursorBefore : s.setCursorAfter, fakeNode);

		return true;
	}

	return false;
}
