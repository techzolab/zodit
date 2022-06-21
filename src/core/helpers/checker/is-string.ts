/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/checker
 */

import { isArray } from 'zodit/core/helpers/checker/is-array';

/**
 * Check value is String
 */
export function isString(value: unknown): value is string {
	return typeof value === 'string';
}

/**
 * Check value is Array of String
 */
export function isStringArray(value: unknown): value is string[] {
	return isArray(value) && isString(value[0]);
}
