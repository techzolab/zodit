/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/string
 */

/**
 * Make a string's first character uppercase
 */
export function ucfirst(value: string): string {
	if (!value.length) {
		return '';
	}

	return value[0].toUpperCase() + value.substr(1);
}
