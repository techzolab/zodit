/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/checker
 */

/**
 * Detect if string is HTML from MS Word or Excel
 */
export function isHtmlFromWord(data: string): boolean {
	return (
		data.search(/<meta.*?Microsoft Excel\s[\d].*?>/) !== -1 ||
		data.search(/<meta.*?Microsoft Word\s[\d].*?>/) !== -1 ||
		(data.search(/style="[^"]*mso-/) !== -1 && data.search(/<font/) !== -1)
	);
}
