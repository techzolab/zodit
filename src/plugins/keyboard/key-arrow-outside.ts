/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/keyboard
 */

import type { IZodit } from 'zodit/types';
import { Plugin } from 'zodit/core/plugin';
import { watch } from 'zodit/core/decorators';
import { KEY_RIGHT, NBSP_SPACE } from 'zodit/core/constants';
import { Dom } from 'zodit/core/dom';
import { findNotEmptyNeighbor } from './helpers';

/**
 * Allowing to go outside of an inline element if there is no other element after that.
 */
export class KeyArrowOutside extends Plugin {
	protected afterInit(zodit: IZodit): void {}

	protected beforeDestruct(zodit: IZodit): void {}

	@watch(':keydown')
	protected onKeyDownArrow(e: KeyboardEvent): void {
		if (e.key !== KEY_RIGHT || !this.j.selection.isCollapsed()) {
			return;
		}

		const { endContainer, endOffset } = this.j.selection.range;

		if (!Dom.isText(endContainer)) {
			return;
		}

		if (endContainer.nodeValue?.length === endOffset) {
			const { parentNode } = endContainer;

			if (
				Dom.isInlineBlock(parentNode) &&
				!findNotEmptyNeighbor(parentNode, false, this.j.editor)
			) {
				Dom.after(parentNode, this.j.createInside.text(NBSP_SPACE));
			}
		}
	}
}
