/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module selection
 */

import type { Nullable } from 'zodit/types';
import { Dom } from 'zodit/core/dom';

export function moveTheNodeAlongTheEdgeOutward(
	node: Node,
	start: boolean,
	root: HTMLElement
): void {
	let item: Nullable<Node> = node;

	while (item && item !== root) {
		const sibling = Dom.findSibling(item, start);

		if (sibling) {
			return;
		}

		item = item.parentElement;

		if (item && item !== root) {
			start ? Dom.before(item, node) : Dom.after(item, node);
		}
	}

	return;
}
