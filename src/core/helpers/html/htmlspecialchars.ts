/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/html
 */

/**
 * Convert special characters to HTML entities
 */
export function htmlspecialchars(html: string): string {
	const tmp = document.createElement('div');
	tmp.textContent = html;
	return tmp.innerHTML;
}
