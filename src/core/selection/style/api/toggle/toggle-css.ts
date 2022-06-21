/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import type { CommitMode, IZodit } from 'zodit/types';
import type { CommitStyle } from 'zodit/core/selection/style/commit-style';
import { attr } from 'zodit/core/helpers/utils';
import { css } from 'zodit/core/helpers/utils/css';
import { dataBind } from 'zodit/core/helpers/utils/data-bind';
import { kebabCase } from 'zodit/core/helpers/string/kebab-case';
import { normalizeCssValue } from 'zodit/core/helpers/normalize/normalize-css-value';
import { size } from 'zodit/core/helpers/size/object-size';
import { Dom } from 'zodit/core/dom';
import { CHANGE, UNSET, UNWRAP } from 'zodit/core/selection/style/commit-style';
import { getContainer } from 'zodit/core/global';

/**
 * Toggles css and classname
 * @private
 */
export function toggleCSS(
	commitStyle: CommitStyle,
	elm: HTMLElement,
	zodit: IZodit,
	mode: CommitMode,
	dry: boolean = false
): CommitMode {
	const { style, className } = commitStyle.options;

	if (style && size(style) > 0) {
		Object.keys(style).forEach((rule: string) => {
			const inlineValue = elm.style.getPropertyValue(kebabCase(rule));

			if (inlineValue === '' && style[rule] == null) {
				return;
			}

			if (
				getNativeCSSValue(zodit, elm, rule) ===
				normalizeCssValue(rule, style[rule] as string)
			) {
				!dry && css(elm, rule, null);
				mode = UNSET;
				mode = removeExtraStyleAttribute(commitStyle, elm, mode);
				return;
			}

			mode = CHANGE;
			!dry && css(elm, rule, style[rule]);
			if (!dry) {
				mode = removeExtraStyleAttribute(commitStyle, elm, mode);
			}
		});
	}

	if (className) {
		if (elm.classList.contains(className)) {
			elm.classList.remove(className);
			mode = UNSET;
		} else {
			elm.classList.add(className);
			mode = CHANGE;
		}
	}

	return mode;
}

/**
 * If the element has an empty style attribute, it removes the attribute,
 * and if it is default, it removes the element itself
 */
function removeExtraStyleAttribute(
	commitStyle: CommitStyle,
	elm: HTMLElement,
	mode: CommitMode
): CommitMode {
	if (!attr(elm, 'style')) {
		attr(elm, 'style', null);

		if (elm.tagName.toLowerCase() === commitStyle.defaultTag) {
			Dom.unwrap(elm);
			mode = UNWRAP;
		}
	}

	return mode;
}

/**
 * Creates an iframe into which elements will be inserted to test their default styles in the browser
 */
function getShadowRoot(zodit: IZodit): HTMLElement {
	if (dataBind(zodit, 'shadowRoot') !== undefined) {
		return dataBind(zodit, 'shadowRoot');
	}

	const container = getContainer(zodit);

	const iframe = document.createElement('iframe');
	css(iframe, {
		width: 0,
		height: 0,
		position: 'absolute',
		border: 0
	});

	iframe.src = 'about:blank';
	container.appendChild(iframe);

	const doc = iframe.contentWindow?.document;

	const shadowRoot = !doc ? zodit.od.body : doc.body;
	dataBind(zodit, 'shadowRoot', shadowRoot);

	return shadowRoot;
}

/**
 * `strong -> fontWeight 700`
 */
function getNativeCSSValue(
	zodit: IZodit,
	elm: HTMLElement,
	key: string
): ReturnType<typeof css> {
	const newElm = zodit.create.element(elm.tagName.toLowerCase());
	newElm.style.cssText = elm.style.cssText;
	const root = getShadowRoot(zodit);
	root.appendChild(newElm);
	const result = css(newElm, key);
	Dom.safeRemove(newElm);
	return result;
}
