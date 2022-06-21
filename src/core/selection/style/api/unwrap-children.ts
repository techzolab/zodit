/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import type { CommitStyle } from '../commit-style';
import type { IDictionary } from 'zodit/types';
import { Dom } from 'zodit/core/dom';
import { isSameStyleChild, isSuitElement } from './is-suit-element';
import { attr, css } from 'zodit/core/helpers';
import { elementHasSameStyleKeys } from 'zodit/core/selection/style/api/element-has-same-style';

/**
 * Unwrap all suit elements inside
 * @private
 */
export function unwrapChildren(style: CommitStyle, font: HTMLElement): boolean {
	const needUnwrap: Node[] = [];
	const needChangeStyle: any[] = [];

	let firstElementSuit: boolean | undefined;

	const cssStyle = style.options.style;

	if (font.firstChild) {
		const gen = Dom.eachGen(font);

		let item = gen.next();

		while (!item.done) {
			const elm = item.value;

			if (
				isSuitElement(style, elm as HTMLElement, true) &&
				(!cssStyle || elementHasSameStyleKeys(elm, cssStyle))
			) {
				if (firstElementSuit === undefined) {
					firstElementSuit = true;
				}

				needUnwrap.push(elm);
			} else if (cssStyle && isSameStyleChild(style, elm)) {
				if (firstElementSuit === undefined) {
					firstElementSuit = false;
				}

				needChangeStyle.push(() => {
					css(
						elm,
						Object.keys(cssStyle).reduce((acc, key) => {
							acc[key] = null;
							return acc;
						}, <IDictionary>{})
					);

					if (!attr(elm, 'style')) {
						attr(elm, 'style', null);
					}

					if (
						!attr(elm, 'style') &&
						elm.nodeName.toLowerCase() === style.element
					) {
						needUnwrap.push(elm);
					}
				});
			} else if (!Dom.isEmptyTextNode(elm)) {
				if (firstElementSuit === undefined) {
					firstElementSuit = false;
				}
			}

			item = gen.next();
		}
	}

	needChangeStyle.forEach(clb => clb());
	needUnwrap.forEach(Dom.unwrap);

	return Boolean(firstElementSuit);
}
