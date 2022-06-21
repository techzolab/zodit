/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import type { CommitStyle } from '../commit-style';
import { Dom } from 'zodit/core/dom';

/**
 * Add or remove styles to element
 * @param elm - The element to switch styles
 * @private
 */
export function toggleCommitStyles(
	commitStyle: CommitStyle,
	elm: HTMLElement
): boolean {
	if (
		commitStyle.elementIsBlock ||
		(Dom.isTag(elm, commitStyle.element) && !commitStyle.elementIsDefault)
	) {
		Dom.unwrap(elm);
		return true;
	}

	return false;
}
