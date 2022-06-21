/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/utils
 */

/**
 * CTRL pressed
 * @returns true ctrl key was pressed
 */
export const ctrlKey = (e: MouseEvent | KeyboardEvent): boolean => {
	if (
		typeof navigator !== 'undefined' &&
		navigator.userAgent.indexOf('Mac OS X') !== -1
	) {
		if (e.metaKey && !e.altKey) {
			return true;
		}
	} else if (e.ctrlKey && !e.altKey) {
		return true;
	}
	return false;
};
