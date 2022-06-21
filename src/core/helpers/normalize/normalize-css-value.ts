/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/normalize
 */

import { isNumeric } from '../checker/is-numeric';
import { kebabCase } from '../string/kebab-case';
import { colorToHex } from '../color/color-to-hex';

export function normalizeCssValue(
	key: string,
	value: string | number
): string | number {
	switch (kebabCase(key)) {
		case 'font-weight':
			switch (value.toString().toLowerCase()) {
				case '700':
				case 'bold':
					return 700;

				case '400':
				case 'normal':
					return 400;

				case '900':
				case 'heavy':
					return 900;
			}

			return isNumeric(value) ? Number(value) : value;
	}

	if (/color/i.test(key) && /^rgb/i.test(value.toString())) {
		return colorToHex(value.toString()) || value;
	}

	return value;
}
