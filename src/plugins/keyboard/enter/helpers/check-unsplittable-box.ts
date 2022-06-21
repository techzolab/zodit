/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/keyboard/enter
 */

import type { IZodit } from 'zodit/types';
import { Dom } from 'zodit/core/dom/dom';

/**
 * Inside quote/tables cell, etc. you can't split so just add br
 * @private
 */
export function checkUnsplittableBox(
	zodit: IZodit,
	currentBox: HTMLElement
): boolean {
	const sel = zodit.s;

	if (!Dom.canSplitBlock(currentBox)) {
		const br = zodit.createInside.element('br');

		sel.insertNode(br, false, false);
		sel.setCursorAfter(br);

		return false;
	}

	return true;
}
