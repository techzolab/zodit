/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import type { IZodit } from 'zodit/types';
import type { CommitStyle } from '../commit-style';
import { Dom } from 'zodit/core/dom';
import { wrapUnwrappedText } from './wrap-unwrapped-text';
import { attr } from 'zodit/core/helpers';
import { wrapOrderedList } from './wrap-ordered-list';

/**
 * Replaces the parent tag with the applicable one, or wraps the text and also replaces the tag
 * @private
 */
export function wrapAndCommitStyle(
	commitStyle: CommitStyle,
	font: HTMLElement,
	zodit: IZodit
): HTMLElement {
	const wrapper = findOrCreateWrapper(commitStyle, font, zodit);

	return commitStyle.elementIsList
		? wrapOrderedList(commitStyle, wrapper, zodit)
		: Dom.replace(wrapper, commitStyle.element, zodit.createInside, true);
}

/**
 * If we apply a block element, then it finds the closest block parent (exclude table cell etc.),
 * otherwise it wraps free text in an element.
 */
function findOrCreateWrapper(
	commitStyle: CommitStyle,
	font: HTMLElement,
	zodit: IZodit
): HTMLElement {
	if (commitStyle.elementIsBlock) {
		const box = Dom.up(
			font,
			node =>
				Dom.isBlock(node) &&
				!Dom.isTag(node, [
					'td',
					'th',
					'tr',
					'tbody',
					'table',
					'li',
					'ul',
					'ol'
				]),
			zodit.editor
		);

		if (box) {
			return box;
		}
	}

	if (commitStyle.elementIsBlock) {
		return wrapUnwrappedText(commitStyle, font, zodit, zodit.s.createRange);
	}

	attr(font, 'size', null);

	return font;
}
