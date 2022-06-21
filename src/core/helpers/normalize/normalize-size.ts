/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/normalize
 */

/**
 * Normalize value to CSS meters
 */
export const normalizeSize = (value: string | number): string => {
	if (/^[0-9]+$/.test(value.toString())) {
		return value + 'px';
	}
	return value.toString();
};
