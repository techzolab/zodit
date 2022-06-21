/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import { Dom } from '../../../../core/dom';
import type { IZodit } from 'zodit/types';

/**
 * Inside the CELL table - nothing to do
 *
 * @example
 * ```html
 * <table><tr><td>|test</td></tr></table>
 * ```
 * result
 * ```html
 * <table><tr><td>|test</td></tr></table>
 * ```
 *
 * @private
 */
export function checkTableCell(zodit: IZodit, fakeNode: Node): boolean {
	const cell = fakeNode.parentElement;

	if (Dom.isCell(cell)) {
		return true;
	}

	return false;
}
