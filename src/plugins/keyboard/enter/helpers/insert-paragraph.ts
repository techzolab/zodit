/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/keyboard/enter
 */

import type { HTMLTagNames, IZodit, Nullable } from 'zodit/types';
import { Dom } from 'zodit/core/dom/dom';
import { scrollIntoViewIfNeeded } from 'zodit/core/helpers/utils/scroll-into-view';

/**
 * Insert default paragraph
 * @private
 */
export function insertParagraph(
	editor: IZodit,
	fake: Nullable<Text>,
	wrapperTag: HTMLTagNames,
	style?: CSSStyleDeclaration
): HTMLElement {
	const { s, createInside } = editor,
		p = createInside.element(wrapperTag),
		helper_node = createInside.element('br');

	p.appendChild(helper_node);

	if (style && style.cssText) {
		p.setAttribute('style', style.cssText);
	}

	if (fake && fake.isConnected) {
		Dom.before(fake, p);
		Dom.safeRemove(fake);
	} else {
		s.insertNode(p, false, false);
	}

	const range = s.createRange();
	range.setStartBefore(wrapperTag.toLowerCase() !== 'br' ? helper_node : p);
	range.collapse(true);
	s.sel?.removeAllRanges();
	s.sel?.addRange(range);

	scrollIntoViewIfNeeded(p, editor.editor, editor.ed);

	return p;
}
