/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/checker
 */

/**
 * Check if name has normal format
 */
export function isValidName(name: string): boolean {
	if (!name.length) {
		return false;
	}

	return !/[^0-9A-Za-zа-яА-ЯЁё\w\-_.]/.test(name);
}
