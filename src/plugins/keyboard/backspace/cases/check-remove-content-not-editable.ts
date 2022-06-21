/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */
import type { IZodit } from 'zodit/types';
import { Dom } from 'zodit/core/dom';
import { call } from 'zodit/core/helpers';
import { moveNodeInsideStart } from 'zodit/core/selection/helpers';

/**
 * Checks if a non-editable element can be deleted
 * @private
 */
export function checkRemoveContentNotEditable(
	zodit: IZodit,
	fakeNode: Text,
	backspace: boolean
): boolean {
	let neighbor = Dom.findSibling(fakeNode, backspace);

	if (
		!neighbor &&
		fakeNode.parentElement &&
		fakeNode.parentElement !== zodit.editor
	) {
		neighbor = Dom.findSibling(fakeNode.parentElement, backspace);
	}

	if (
		Dom.isElement(neighbor) &&
		!Dom.isContentEditable(neighbor, zodit.editor)
	) {
		call(backspace ? Dom.before : Dom.after, neighbor, fakeNode);
		Dom.safeRemove(neighbor);
		moveNodeInsideStart(zodit, fakeNode, backspace);

		call(
			backspace ? zodit.s.setCursorBefore : zodit.s.setCursorAfter,
			fakeNode
		);

		return true;
	}

	return false;
}
