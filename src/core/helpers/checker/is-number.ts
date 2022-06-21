/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/checker
 */

/**
 * Check value is a number
 */
export function isNumber(value: unknown): value is number {
	return typeof value === 'number' && !isNaN(value) && isFinite(value);
}
