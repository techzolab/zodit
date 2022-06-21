/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/keyboard/enter
 */

import type { IZodit } from 'zodit/types';
import { Dom } from 'zodit/core/dom/dom';

/**
 * @private
 */
export function hasPreviousBlock(zodit: IZodit, current: Node): boolean {
	return Boolean(
		Dom.prev(
			current,
			elm => Dom.isBlock(elm) || Dom.isImage(elm),
			zodit.editor
		)
	);
}
