/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module selection
 */

import type { IZodit } from 'zodit/types';
import { Dom } from 'zodit/core/dom';
import { INSEPARABLE_TAGS } from 'zodit/core/constants';

/**
 * Moves the fake node inside the adjacent element if it lies next to it but not inside.
 * When the cursor is positioned in its place, it must be inside the element and not outside its border.
 */
export function moveNodeInsideStart(
	j: IZodit,
	node: Node,
	start: boolean
): void {
	let sibling = Dom.findSibling(node, start),
		anotherSibling = Dom.findSibling(node, !start);

	while (
		Dom.isElement(sibling) &&
		!Dom.isTag(sibling, INSEPARABLE_TAGS) &&
		Dom.isContentEditable(sibling, j.editor) &&
		(!anotherSibling || !Dom.closest(node, Dom.isElement, j.editor))
	) {
		if (start || !sibling.firstChild) {
			sibling.appendChild(node);
		} else {
			Dom.before(sibling.firstChild, node);
		}

		sibling = Dom.sibling(node, start);
		anotherSibling = Dom.sibling(node, !start);
	}
}
