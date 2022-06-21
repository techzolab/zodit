/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/fix/clean-html
 */

import type { IZodit, Nullable } from 'zodit/types';
import { Dom } from 'zodit/core/dom/dom';
import { INSEPARABLE_TAGS } from 'zodit/core/constants';

/**
 * For collapsed selection move cursor outside or split inline block
 * @private
 */
export function removeFormatForCollapsedSelection(
	zodit: IZodit,
	fake?: Node
): Nullable<Text> | void {
	const { s } = zodit;

	let fakeNode = fake;

	if (!fakeNode) {
		fakeNode = zodit.createInside.fake();
		s.range.insertNode(fakeNode);
		s.range.collapse();
	}

	const mainInline = Dom.furthest(fakeNode, isInlineBlock, zodit.editor);

	if (mainInline) {
		if (s.cursorOnTheLeft(mainInline)) {
			Dom.before(mainInline, fakeNode);
		} else if (s.cursorOnTheRight(mainInline)) {
			Dom.after(mainInline, fakeNode);
		} else {
			const leftHand = s.splitSelection(mainInline);
			leftHand && Dom.after(leftHand, fakeNode);
		}
	}

	if (!fake) {
		s.setCursorBefore(fakeNode);
		Dom.safeRemove(fakeNode);
	}
}

/**
 * Element has inline display mode
 */
export function isInlineBlock(node: Nullable<Node>): node is Node {
	return Dom.isInlineBlock(node) && !Dom.isTag(node, INSEPARABLE_TAGS);
}
