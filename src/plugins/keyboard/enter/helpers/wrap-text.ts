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
 * If there is no container outside,
 * then we wrap all the nearest inline nodes in a container
 * @private
 */
export function wrapText(zodit: IZodit, current: Node): HTMLElement {
	let needWrap = current;

	Dom.up(
		needWrap,
		node => {
			if (node && node.hasChildNodes() && node !== zodit.editor) {
				needWrap = node;
			}
		},
		zodit.editor
	);

	const currentBox = Dom.wrapInline(needWrap, zodit.o.enter, zodit);

	if (Dom.isEmpty(currentBox)) {
		const helper_node = zodit.createInside.element('br');

		currentBox.appendChild(helper_node);
		zodit.s.setCursorBefore(helper_node);
	}

	return currentBox;
}
