/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import type { IZodit } from 'zodit/types';
import { Dom } from 'zodit/core/dom';
import type { CommitStyle } from '../commit-style';

/**
 * Replaces non-leaf items with leaf items and either creates a new list or
 * adds a new item to the nearest old list
 * @private
 */
export function wrapOrderedList(
	commitStyle: CommitStyle,
	wrapper: HTMLElement,
	zodit: IZodit
): HTMLElement {
	const newWrapper = Dom.replace(wrapper, 'li', zodit.createInside);

	let list =
		newWrapper.previousElementSibling || newWrapper.nextElementSibling;

	if (!Dom.isTag(list, ['ul', 'ol'])) {
		list = zodit.createInside.element(commitStyle.element);
		Dom.before(newWrapper, list);
	}

	if (newWrapper.previousElementSibling === list) {
		Dom.append(list, newWrapper);
	} else {
		Dom.prepend(list, newWrapper);
	}

	return <HTMLElement>list;
}
