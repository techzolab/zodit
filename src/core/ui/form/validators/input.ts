/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module ui/form
 */

import type { IUIInput, IUIInputValidator } from 'zodit/types';
import { isURL } from 'zodit/core/helpers/checker/is-url';
import { trim } from 'zodit/core/helpers/string/trim';

/**
 * Input is required
 */
export const required = <IUIInputValidator>function (input: IUIInput): boolean {
	if (!trim(input.value).length) {
		input.error = 'Please fill out this field';
		return false;
	}

	return true;
};

/**
 * Input value should be valid URL
 */
export const url = <IUIInputValidator>function (input: IUIInput): boolean {
	if (!isURL(trim(input.value))) {
		input.error = 'Please enter a web address';
		return false;
	}

	return true;
};
