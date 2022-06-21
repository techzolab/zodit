/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/fix/clean-html
 */

import type { IZodit } from 'zodit/types';
import { Dom } from 'zodit/core/dom/dom';

/**
 * @private
 */
export function fillEmptyParagraph(
	zodit: IZodit,
	nodeElm: Node,
	hadEffect: boolean
): boolean {
	if (
		zodit.o.cleanHTML.fillEmptyParagraph &&
		Dom.isBlock(nodeElm) &&
		Dom.isEmpty(nodeElm, /^(img|svg|canvas|input|textarea|form|br)$/)
	) {
		const br = zodit.createInside.element('br');
		nodeElm.appendChild(br);
		return true;
	}

	return hadEffect;
}
