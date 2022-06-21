/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import type { IZodit, Nullable } from 'zodit/types';
import { Dom } from 'zodit/core/dom';
import { findNotEmptyNeighbor } from 'zodit/plugins/keyboard/helpers';
import { INSEPARABLE_TAGS } from 'zodit/core/constants';
import { checkJoinTwoLists } from 'zodit/plugins/keyboard/backspace/cases/check-join-two-lists';

/**
 * Check if the current empty item can be removed
 *
 * @example
 * ```html
 * <p>first stop</p><p>|<br></p>
 * ```
 * result
 * ```html
 * <p>first stop|</p>
 * ```
 *
 * @private
 */
export function checkRemoveEmptyParent(
	zodit: IZodit,
	fakeNode: Node,
	backspace: boolean
): boolean {
	let found: boolean = false;
	const { setCursorBefore, setCursorIn } = zodit.s;

	let prn: Nullable<Node> = Dom.closest(
		fakeNode,
		Dom.isElement,
		zodit.editor
	);

	if (!prn || !Dom.isEmpty(prn)) {
		return false;
	}

	const neighbor = findNotEmptyNeighbor(fakeNode, backspace, zodit.editor);

	do {
		if (prn && Dom.isEmpty(prn) && !Dom.isCell(prn)) {
			Dom.after(prn, fakeNode);

			const tmp: Nullable<Node> = Dom.closest(
				prn,
				n => Dom.isElement(n) && n !== prn,
				zodit.editor
			);

			Dom.safeRemove(prn);

			found = true;

			prn = tmp;
		} else {
			break;
		}
	} while (prn);

	if (found && checkJoinTwoLists(zodit, fakeNode, backspace)) {
		return true;
	}

	if (
		neighbor &&
		!Dom.isText(neighbor) &&
		!Dom.isTag(neighbor, INSEPARABLE_TAGS)
	) {
		setCursorIn(neighbor, !backspace);
	} else {
		setCursorBefore(fakeNode);
	}

	return found;
}
