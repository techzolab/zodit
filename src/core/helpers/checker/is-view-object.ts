/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/checker
 */

import type { IViewBased } from 'zodit/types';
import { isFunction } from './is-function';

/**
 * Check if element is instance of View
 */
export function isViewObject(zodit: unknown): zodit is IViewBased {
	return Boolean(
		zodit &&
			zodit instanceof Object &&
			isFunction(zodit.constructor) &&
			(zodit as IViewBased).isView
	);
}
