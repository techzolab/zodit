/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import { Dom } from 'zodit/core/dom';

/**
 * Check if FONT inside STYLE or SCRIPT element
 * @private
 */
export function isInsideInvisibleElement(
	font: HTMLElement,
	root: HTMLElement
): boolean {
	return Boolean(Dom.closest(font, ['style', 'script'], root));
}
