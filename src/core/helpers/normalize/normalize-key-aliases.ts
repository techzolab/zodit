/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/normalize
 */

import type { IDictionary } from 'zodit/types';
import { trim } from 'zodit/core/helpers/string/trim';
import { KEY_ALIASES } from 'zodit/core/constants';

/**
 * Normalize keys to some standard name
 */
export function normalizeKeyAliases(keys: string): string {
	const memory: IDictionary<boolean> = {};

	return keys
		.replace(/\+\+/g, '+add')
		.split(/[\s]*\+[\s]*/)
		.map(key => trim(key.toLowerCase()))
		.map(key => KEY_ALIASES[key] || key)
		.sort()
		.filter(key => !memory[key] && key !== '' && (memory[key] = true))
		.join('+');
}
