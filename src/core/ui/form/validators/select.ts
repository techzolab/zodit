/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module ui/form
 */

import type { IUIInputValidator } from 'zodit/types';
import { trim } from 'zodit/core/helpers/string/trim';

/**
 * Select is required
 */
export const required = <IUIInputValidator>function (select): boolean {
	if (!trim(select.value).length) {
		select.error = 'Please fill out this field';
		return false;
	}

	return true;
};
