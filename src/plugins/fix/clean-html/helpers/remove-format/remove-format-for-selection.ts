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
import { attr } from 'zodit/core/helpers/utils';
import { findNotEmptySibling } from 'zodit/plugins/keyboard/helpers';
import {
	isInlineBlock,
	removeFormatForCollapsedSelection
} from './remove-format-for-collapsed-selection';

/**
 * Remove formatting for all selected elements
 * @private
 */
export function removeFormatForSelection(zodit: IZodit): void {
	const { s, editor, createInside } = zodit,
		{ range } = s,
		left = range.cloneRange(),
		right = range.cloneRange(),
		fakeLeft = createInside.fake(),
		fakeRight = createInside.fake();

	left.collapse(true);
	right.collapse(false);

	left.insertNode(fakeLeft);
	right.insertNode(fakeRight);

	range.setStartBefore(fakeLeft);
	range.collapse(true);
	s.selectRange(range);
	removeFormatForCollapsedSelection(zodit, fakeLeft);

	range.setEndAfter(fakeRight);
	range.collapse(false);
	s.selectRange(range);
	removeFormatForCollapsedSelection(zodit, fakeRight);

	const shouldUnwrap: Node[] = [];

	Dom.between(fakeLeft, fakeRight, node => {
		if (isInlineBlock(node) && !Dom.isTag(node, ['a'])) {
			shouldUnwrap.push(node);
		}

		if (Dom.isElement(node) && attr(node, 'style')) {
			attr(node, 'style', null);
		}
	});

	shouldUnwrap.forEach(node => Dom.unwrap(node));

	const clearParent = (node: Node, left: boolean): true | void => {
		if (!findNotEmptySibling(node, left)) {
			const pn = node.parentNode as Element;

			if (pn && pn !== editor && attr(pn, 'style')) {
				attr(pn, 'style', null);
				clearParent(pn, left);

				return true;
			}
		}
	};

	clearParent(fakeLeft, true) && clearParent(fakeRight, false);

	range.setStartAfter(fakeLeft);
	range.setEndBefore(fakeRight);
	s.selectRange(range);

	Dom.safeRemove(fakeLeft);
	Dom.safeRemove(fakeRight);
}
