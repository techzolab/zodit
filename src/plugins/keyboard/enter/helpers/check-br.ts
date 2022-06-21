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
import { scrollIntoViewIfNeeded } from 'zodit/core/helpers/utils/scroll-into-view';
import { BR } from 'zodit/core/constants';

/**
 * Checks the possibility and necessity of inserting a BR instead of a block
 * @private
 */
export function checkBR(
	zodit: IZodit,
	current: Node,
	shiftKeyPressed?: boolean
): boolean {
	const isMultiLineBlock = Dom.closest(
		current,
		['pre', 'blockquote'],
		zodit.editor
	);

	const isBRMode = zodit.o.enter.toLowerCase() === BR.toLowerCase();

	// if use <br> defaultTag for break line or when was entered SHIFt key or in <td> or <th> or <blockquote>
	if (
		isBRMode ||
		(shiftKeyPressed && !isMultiLineBlock) ||
		(!shiftKeyPressed && isMultiLineBlock)
	) {
		const br = zodit.createInside.element('br');
		zodit.s.insertNode(br, true, false);
		scrollIntoViewIfNeeded(br, zodit.editor, zodit.ed);

		return false;
	}

	return true;
}
