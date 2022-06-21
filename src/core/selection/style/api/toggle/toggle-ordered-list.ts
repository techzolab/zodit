/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import type { IZodit, CommitMode } from 'zodit/types';
import type { CommitStyle } from '../../commit-style';
import { Dom } from 'zodit/core/dom';
import { extractSelectedPart } from '../extract';
import { CHANGE, INITIAL, REPLACE } from '../../commit-style';
import { toggleCSS } from './toggle-css';

/**
 * Replaces `ul->ol` or `ol->ul`, apply styles to the list, or remove a list item from it
 * @private
 */
export function toggleOrderedList(
	style: CommitStyle,
	li: HTMLElement,
	zodit: IZodit,
	mode: CommitMode
): CommitMode {
	if (!li) {
		return mode;
	}

	const list = li.parentElement;

	if (!list) {
		return mode;
	}

	// ul => ol, ol => ul
	if (list.tagName.toLowerCase() !== style.element) {
		const newList = Dom.replace(list, style.element, zodit.createInside);
		toggleCSS(style, newList, zodit, mode);
		return REPLACE;
	}

	if (toggleCSS(style, li.parentElement, zodit, INITIAL, true) === CHANGE) {
		return toggleCSS(style, li.parentElement, zodit, mode);
	}

	extractSelectedPart(list, li, zodit);
	Dom.unwrap(li.parentElement);
	Dom.replace(li, zodit.o.enter, zodit.createInside);

	return mode;
}
