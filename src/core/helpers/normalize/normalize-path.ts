/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/normalize
 */

import { trim } from '../string';

/**
 * Replaces back slashes and correctly concatenates several parts of the path.
 */
export const normalizePath = (...path: string[]): string => {
	return path
		.filter(part => trim(part).length)
		.map((part, index) => {
			part = part.replace(/([^:])[\\/]+/g, '$1/');

			if (index) {
				part = part.replace(/^\//, '');
			}

			if (index !== path.length - 1) {
				part = part.replace(/\/$/, '');
			}

			return part;
		})
		.join('/');
};
