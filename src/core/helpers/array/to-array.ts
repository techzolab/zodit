/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/array
 */

import { reset } from '../utils/reset';
import { isNativeFunction } from '../checker/is-native-function';

/**
 * Always return Array. In some cases(Joomla Mootools)
 * Array.from can be replaced to some bad implementation.
 */
export const toArray = function toArray<T extends typeof Array.from>(
	...args: Parameters<T>
): ReturnType<T> {
	const func = isNativeFunction(Array.from)
		? Array.from
		: reset<typeof Array.from>('Array.from') ?? Array.from;

	return func.apply(Array, args) as ReturnType<T>;
} as typeof Array.from;
