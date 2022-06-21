/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/size
 */

import type { IBound, IViewBased } from 'zodit/types';
import { isZoditObject } from '../checker/is-zodit-object';

export function position(elm: HTMLElement): IBound;
export function position(elm: HTMLElement, zodit: IViewBased): IBound;
export function position(
	elm: HTMLElement,
	zodit: IViewBased,
	recurse: boolean
): IBound;

/**
 * Calculate screen element position
 */
export function position(
	elm: HTMLElement,
	zodit?: IViewBased,
	recurse: boolean = false
): IBound {
	const rect = elm.getBoundingClientRect();

	let xPos = rect.left,
		yPos = rect.top;

	if (isZoditObject(zodit) && zodit.iframe && !recurse) {
		const { left, top } = position(zodit.iframe, zodit, true);

		xPos += left;
		yPos += top;
	}

	return {
		left: Math.round(xPos),
		top: Math.round(yPos),
		width: Math.round(elm.offsetWidth),
		height: Math.round(elm.offsetHeight)
	};
}
