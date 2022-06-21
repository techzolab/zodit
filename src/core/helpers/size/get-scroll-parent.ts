/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/size
 */

import type { Nullable } from 'zodit/types';
import { css } from 'zodit/core/helpers/utils';
import { Dom } from 'zodit/core/dom/dom';

export function getScrollParent(node: Nullable<Node>): Nullable<Element> {
	if (!node) {
		return null;
	}

	const isElement = Dom.isHTMLElement(node);
	const overflowY = isElement && css(node, 'overflowY');
	const isScrollable =
		isElement && overflowY !== 'visible' && overflowY !== 'hidden';

	if (isScrollable && node.scrollHeight >= node.clientHeight) {
		return node;
	}

	return (
		getScrollParent(node.parentNode) ||
		document.scrollingElement ||
		document.body
	);
}
