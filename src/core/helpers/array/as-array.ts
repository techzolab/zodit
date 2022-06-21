/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/array
 */

import { isArray } from '../checker/is-array';

/**
 * Always return Array
 */
export const asArray = <T>(a: T[] | T): T[] => (isArray(a) ? a : [a]);
