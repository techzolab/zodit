/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/checker
 */

/**
 * Check if browser has a color picker (a new HTML5 attribute for input tag)
 */
export function hasBrowserColorPicker(): boolean {
	let supportsColor = true;

	try {
		const a = document.createElement('input');

		a.type = 'color';
		supportsColor =
			a.type === 'color' && typeof a.selectionStart !== 'number';
	} catch (e) {
		supportsColor = false;
	}

	return supportsColor;
}
