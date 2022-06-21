/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/size
 */

import { isArray, isPlainObject, isString } from '../checker';
import type { CanUndef } from 'zodit/types';

export function size(
	subject: CanUndef<object | string | Array<unknown>>
): number {
	if (isString(subject) || isArray(subject)) {
		return subject.length;
	}

	if (isPlainObject(subject)) {
		return Object.keys(subject).length;
	}

	return 0;
}
