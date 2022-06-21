/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import type { IZodit, Nullable } from 'zodit/types';
import { findNotEmptySibling } from 'zodit/plugins/keyboard/helpers';
import { Dom } from 'zodit/core/dom';

/**
 * Check if two separate elements can be connected
 */
export function checkJoinNeighbors(
	zodit: IZodit,
	fakeNode: Node,
	backspace: boolean
): boolean {
	let nextBox: Nullable<Node> = fakeNode,
		mainClosestBox: Nullable<Node> = nextBox;

	// Find main big closest element
	while (
		nextBox &&
		!findNotEmptySibling(nextBox, backspace) &&
		nextBox.parentElement !== zodit.editor
	) {
		nextBox = nextBox.parentElement;
		mainClosestBox = nextBox;
	}

	if (
		Dom.isElement(mainClosestBox) &&
		Dom.isContentEditable(mainClosestBox, zodit.editor)
	) {
		const sibling = findNotEmptySibling(
			mainClosestBox,
			backspace
		) as Nullable<Element>;

		if (
			sibling &&
			(checkMoveListContent(zodit, mainClosestBox, sibling, backspace) ||
				moveContentAndRemoveEmpty(
					zodit,
					mainClosestBox,
					sibling,
					backspace
				))
		) {
			zodit.s.setCursorBefore(fakeNode);
			return true;
		}
	}

	return false;
}

function checkMoveListContent(
	zodit: IZodit,
	mainClosestBox: Element,
	sibling: Element,
	backspace: boolean
): boolean {
	// Process UL/LI/OL cases
	const siblingIsList = Dom.isTag(sibling, ['ol', 'ul']);
	const boxIsList = Dom.isTag(mainClosestBox, ['ol', 'ul']);
	const elementChild = (elm: Element, side: boolean): Nullable<Node> =>
		side ? elm.firstElementChild : elm.lastElementChild;

	if (boxIsList) {
		sibling = zodit.createInside.element(zodit.o.enterBlock);
		Dom.before(mainClosestBox, sibling);

		return moveContentAndRemoveEmpty(
			zodit,
			elementChild(mainClosestBox, backspace),
			sibling,
			backspace
		);
	}

	if (sibling && siblingIsList && !boxIsList) {
		return moveContentAndRemoveEmpty(
			zodit,
			mainClosestBox,
			elementChild(sibling, !backspace),
			backspace
		);
	}

	return false;
}

function moveContentAndRemoveEmpty(
	zodit: IZodit,
	mainClosestBox: Nullable<Node>,
	sibling: Nullable<Node>,
	backspace: boolean
): boolean {
	// Move content and remove empty nodes
	if (mainClosestBox && Dom.isElement(sibling)) {
		Dom.moveContent(mainClosestBox, sibling, !backspace);

		let remove: Nullable<Node> = mainClosestBox;

		while (remove && remove !== zodit.editor && Dom.isEmpty(remove)) {
			const parent: Nullable<Node> = remove.parentElement;
			Dom.safeRemove(remove);
			remove = parent;
		}

		return true;
	}

	return false;
}
