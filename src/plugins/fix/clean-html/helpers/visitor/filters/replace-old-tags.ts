/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/fix/clean-html
 */

import type { HTMLTagNames, IDictionary, IZodit } from 'zodit/types';
import { Dom } from 'zodit/core/dom/dom';

/**
 * @private
 */
export function replaceOldTags(
	zodit: IZodit,
	nodeElm: Node,
	hadEffect: boolean
): boolean {
	const newNodeElm = replaceIfMatched(
		zodit,
		nodeElm,
		zodit.o.cleanHTML.replaceOldTags
	);

	if (nodeElm !== newNodeElm) {
		nodeElm = newNodeElm;
		return true;
	}

	return hadEffect;
}

/**
 * Replaces an element with a newer one if specified in the configuration match
 * @private
 */
function replaceIfMatched(
	zodit: IZodit,
	oldParent: Node,
	list: IDictionary<HTMLTagNames> | false
): Node {
	if (!list || !Dom.isHTMLElement(oldParent)) {
		return oldParent;
	}

	const tagName: string =
		list[oldParent.nodeName.toLowerCase()] || list[oldParent.nodeName];

	if (tagName) {
		return Dom.replace(
			oldParent as HTMLElement,
			tagName as HTMLTagNames,
			zodit.createInside,
			true,
			false
		);
	}

	return oldParent;
}
