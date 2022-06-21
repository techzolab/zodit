/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/checker
 */

/**
 * Check if a string is a url
 */
export function isURL(str: string): boolean {
	if (str.includes(' ')) {
		return false;
	}

	if (typeof URL !== 'undefined') {
		try {
			const url = new URL(str);

			return ['https:', 'http:', 'ftp:', 'file:', 'rtmp:'].includes(
				url.protocol
			);
		} catch (e) {
			return false;
		}
	}

	const a = document.createElement('a');
	a.href = str;

	return Boolean(a.hostname);
}
