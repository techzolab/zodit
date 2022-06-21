/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/keyboard/tab
 */

import type { IZodit } from 'zodit/types';
import { Dom } from 'zodit/core/dom';

/**
 * Checks if the cursor is at the beginning of the LI element when tabbed.
 * If so then add an internal list
 */
export function onTabInsideLi(zodit: IZodit): boolean {
	if (!zodit.o.tab.tabInsideLiInsertNewList || !zodit.s.isCollapsed()) {
		return false;
	}

	const fake = zodit.createInside.fake();
	zodit.s.insertNode(fake);

	const li = Dom.closest(fake, 'li', zodit.editor);

	if (
		li &&
		zodit.s.cursorOnTheLeft(li) &&
		Dom.isTag(li.previousElementSibling, 'li')
	) {
		const list = Dom.closest(li, ['ol', 'ul'], zodit.editor);

		if (list) {
			const newList = zodit.createInside.element(list.tagName);
			const previousLi = li.previousElementSibling;

			newList.appendChild(li);
			previousLi.appendChild(newList);
			zodit.s.setCursorAfter(fake);
			Dom.safeRemove(fake);

			return true;
		}
	}

	Dom.safeRemove(fake);

	return false;
}
