/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/string
 */

/**
 * Convert (kebab-case or snake_case) to camelCase
 */
export const camelCase = (key: string): string => {
	return key.replace(/([-_])(.)/g, (m, code, letter) => {
		return letter.toUpperCase();
	});
};
