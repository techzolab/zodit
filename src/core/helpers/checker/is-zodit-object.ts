/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/checker
 */

import type { IZodit } from 'zodit/types';
import { isFunction } from './is-function';

/**
 * Check if element is instance of Zodit
 */
export function isZoditObject(zodit: unknown): zodit is IZodit {
	return Boolean(
		zodit &&
			zodit instanceof Object &&
			isFunction(zodit.constructor) &&
			// @ts-ignore
			((typeof Zodit !== 'undefined' && zodit instanceof Zodit) ||
				(zodit as IZodit).isZodit)
	);
}
