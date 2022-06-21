/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import type { IZodit } from 'zodit/types';

/**
 * On Not collapsed selection - should only remove whole selected content
 *
 * @example
 * ```html
 * <p>first | stop</p><p>second | stop</p>
 * ```
 * result
 * ```html
 * <p>first | stop</p>
 * ```
 * @private
 */
export function checkNotCollapsed(zodit: IZodit): boolean {
	if (!zodit.s.isCollapsed()) {
		zodit.execCommand('Delete');
		return true;
	}

	return false;
}
