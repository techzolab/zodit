/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/fix/clean-html
 */

import type { IZodit } from 'zodit/types';
import { Dom } from 'zodit/src/core/dom/dom';
import { sanitizeHTMLElement } from 'zodit/core/helpers';

/**
 * @private
 */
export function sanitizeAttributes(
	zodit: IZodit,
	nodeElm: Node,
	hadEffect: boolean
): boolean {
	if (Dom.isElement(nodeElm) && sanitizeHTMLElement(nodeElm)) {
		return true;
	}

	return hadEffect;
}
