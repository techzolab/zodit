/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/keyboard/enter
 */

import type { IZodit, Nullable } from 'zodit/types';
import { insertParagraph } from './insert-paragraph';
import { scrollIntoViewIfNeeded } from 'zodit/core/helpers/utils/scroll-into-view';
import { Dom } from 'zodit/core/dom/dom';

/**
 * Splits a block element into two parts
 * and adds a new default block in the middle/start/end
 * @private
 */
export function splitFragment(zodit: IZodit, currentBox: HTMLElement): void {
	const sel = zodit.s,
		{ enter } = zodit.o;

	const defaultTag = enter.toLowerCase() as typeof enter;
	const isLi = Dom.isTag(currentBox, 'li');
	const canSplit = currentBox.tagName.toLowerCase() === defaultTag || isLi;

	const cursorOnTheRight = sel.cursorOnTheRight(currentBox);
	const cursorOnTheLeft = sel.cursorOnTheLeft(currentBox);

	if (!canSplit && (cursorOnTheRight || cursorOnTheLeft)) {
		let fake: Nullable<Text> = null;

		if (cursorOnTheRight) {
			fake = sel.setCursorAfter(currentBox);
		} else {
			fake = sel.setCursorBefore(currentBox);
		}

		insertParagraph(zodit, fake, defaultTag);

		if (cursorOnTheLeft && !cursorOnTheRight) {
			sel.setCursorIn(currentBox, true);
		}

		return;
	}

	const newP = sel.splitSelection(currentBox);
	scrollIntoViewIfNeeded(newP, zodit.editor, zodit.ed);
}
