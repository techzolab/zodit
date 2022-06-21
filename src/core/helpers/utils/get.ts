/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/utils
 */

import type { IDictionary, Nullable } from 'zodit/types';
import { isString } from '../checker/is-string';
import { isVoid } from '../checker/is-void';

/**
 * Safe access in tree object
 *
 * @example
 * ```js
 * const obj = {
 *   a: {
 *     b: {
 *       c: {
 *         e: false
 *       }
 *     }
 *   }
 * };
 *
 * console.log(Zodit.modules.Helpers.get('a.b.c.d.e', obj) === false); // true
 * console.log(Zodit.modules.Helpers.get('a.b.a.d.e', obj) === null); // false
 * ```
 */
export function get<T>(chain: string, obj: IDictionary): Nullable<T> {
	if (!isString(chain) || !chain.length) {
		return null;
	}

	const parts = chain.split('.');

	let result = obj;

	try {
		for (const part of parts) {
			if (isVoid(result[part])) {
				return null;
			}

			result = result[part];
		}
	} catch {
		return null; // permission denied ore another access exception
	}

	if (isVoid(result)) {
		return null;
	}

	return result as T;
}
