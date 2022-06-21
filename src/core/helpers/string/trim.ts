/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/string
 */

import {
	SPACE_REG_EXP_END,
	SPACE_REG_EXP_START,
	INVISIBLE_SPACE_REG_EXP_END,
	INVISIBLE_SPACE_REG_EXP_START
} from 'zodit/core/constants';

/**
 * It clears the line of all auxiliary invisible characters , from the spaces and line breaks , tabs
 * from the beginning and end of the line
 */
export function trim(value: string): string {
	return value
		.replace(SPACE_REG_EXP_END(), '')
		.replace(SPACE_REG_EXP_START(), '');
}

/**
 * Trim only invisible chars
 */
export function trimInv(value: string): string {
	return value
		.replace(INVISIBLE_SPACE_REG_EXP_END(), '')
		.replace(INVISIBLE_SPACE_REG_EXP_START(), '');
}
