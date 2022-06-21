/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/checker
 */

/**
 * Check value is undefined or null
 */
export function isVoid(value: unknown): value is undefined | null {
	// eslint-disable-next-line eqeqeq
	return value === undefined || value === null;
}
