/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/keyboard/enter
 */

import type { IZodit, Nullable } from 'zodit/types';
import { Dom } from 'zodit/core/dom/dom';
import { $$ } from 'zodit/core/helpers/utils/selector';
import { insertParagraph } from './insert-paragraph';

/**
 * Handles pressing the Enter key inside an empty LI inside a list
 * @private
 */
export function processEmptyLILeaf(zodit: IZodit, li: HTMLElement): void {
	const list: Nullable<HTMLElement> = Dom.closest(
		li,
		['ol', 'ul'],
		zodit.editor
	);

	if (!list) {
		return;
	}

	const parentLi = list.parentElement,
		listInsideLeaf = Dom.isTag(parentLi, 'li');

	const container = listInsideLeaf ? parentLi : list;

	// Empty element in the middle of the list
	const leftRange = zodit.s.createRange();
	leftRange.setStartAfter(li);
	leftRange.setEndAfter(list);
	const rightPart = leftRange.extractContents();

	const fakeTextNode = zodit.createInside.fake();
	Dom.after(container, fakeTextNode);

	Dom.safeRemove(li);

	if (!$$('li', list).length) {
		Dom.safeRemove(list);
	}

	const newLi = insertParagraph(
		zodit,
		fakeTextNode,
		listInsideLeaf ? 'li' : zodit.o.enter
	);

	if (!rightPart.querySelector('li')) {
		return;
	}

	if (listInsideLeaf) {
		newLi.appendChild(rightPart);
	} else {
		Dom.after(newLi, rightPart);
	}
}
