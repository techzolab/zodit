/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/utils
 */

import type { IDictionary, Nullable } from 'zodit/types';
import { get } from './get';
import { isFunction } from '../checker/is-function';

const map: IDictionary = {};

/**
 * Reset Vanila JS native function
 * @example
 * ```js
 * reset('Array.from')(Set([1,2,3])) // [1, 2, 3]
 * ```
 */
export const reset = function <T extends Function>(key: string): Nullable<T> {
	if (!(key in map)) {
		const iframe = document.createElement('iframe');

		try {
			iframe.src = 'about:blank';
			document.body.appendChild(iframe);

			if (!iframe.contentWindow) {
				return null;
			}

			const func = get(key, iframe.contentWindow),
				bind = get(
					key.split('.').slice(0, -1).join('.'),
					iframe.contentWindow
				);

			if (isFunction(func)) {
				map[key] = func.bind(bind);
			}
		} catch (e) {
			if (!isProd) {
				throw e;
			}
		} finally {
			iframe.parentNode?.removeChild(iframe);
		}
	}

	return map[key] ?? null;
};