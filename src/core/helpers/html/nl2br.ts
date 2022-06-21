/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/html
 */

/**
 *  Inserts HTML line breaks before all newlines in a string
 */
export function nl2br(html: string): string {
	return html.replace(/\r\n|\r|\n/g, '<br/>');
}
