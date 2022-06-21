/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import type { Nullable } from 'zodit/types';
import { Dom } from 'zodit/core/dom';

/**
 * Is normal usual element
 * @private
 */
export function isNormalNode(elm: Nullable<Node>): boolean {
	return Boolean(elm && !Dom.isEmptyTextNode(elm) && !Dom.isTemporary(elm));
}
