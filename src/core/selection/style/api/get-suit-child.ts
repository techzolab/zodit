/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import type { Nullable } from 'zodit/types';
import type { CommitStyle } from '../commit-style';
import { Dom } from 'zodit/core/dom';
import { isNormalNode } from './is-normal-node';
import { isSuitElement } from './is-suit-element';

/**
 * Checks if child elements are suitable for applying styles.
 * An element is suitable for us only if it is the only significant child.
 * If the child matches then returns it.
 * @example
 * `<font><strong>selected</strong></font>`
 * @private
 */
export function getSuitChild(
	style: CommitStyle,
	font: HTMLElement
): Nullable<HTMLElement> {
	let { firstChild: child } = font;

	while (child && !isNormalNode(child)) {
		child = child.nextSibling;

		if (!child) {
			return null;
		}
	}

	if (
		child &&
		!Dom.next(child, isNormalNode, font) &&
		isSuitElement(style, child, false)
	) {
		return child;
	}

	return null;
}
