/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/html
 */

import { isString } from 'zodit/core/helpers/checker/is-string';
import { $$ } from 'zodit/core/helpers/utils';
import { trim } from 'zodit/core/helpers/string/trim';
import { Dom } from 'zodit/core/dom/dom';
/**
 * Extract plain text from HTML text
 */
export function stripTags(
	html: string | Node,
	doc: Document = document
): string {
	const tmp = doc.createElement('div');

	if (isString(html)) {
		tmp.innerHTML = html;
	} else {
		tmp.appendChild(html);
	}

	$$('DIV, P, BR, H1, H2, H3, H4, H5, H6, HR', tmp).forEach(p => {
		const pr = p.parentNode;
		if (!pr) {
			return;
		}

		const nx = p.nextSibling;

		if (Dom.isText(nx) && /^\s/.test(nx.nodeValue || '')) {
			return;
		}

		if (nx) {
			pr.insertBefore(doc.createTextNode(' '), nx);
		}
	});

	return trim(tmp.innerText) || '';
}
