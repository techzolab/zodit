/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module ui
 */

import type {
	Buttons,
	Controls,
	IControlTypeStrong,
	IDictionary
} from 'zodit/types';
import { getControlType } from './get-control-type';
import { Config } from 'zodit/config';
import { isArray } from 'zodit/core/helpers/checker/is-array';
import { ConfigProto, keys } from 'zodit/core/helpers/utils';

export function getStrongControlTypes(
	items: Buttons | IDictionary<string>,
	controls?: Controls
): IControlTypeStrong[] {
	const elements = isArray(items)
		? items
		: keys(items, false).map(key => {
				const value = items[key] || {};
				return ConfigProto({ name: key }, value) as IControlTypeStrong;
		  });

	return elements.map(item =>
		getControlType(item, controls || Config.defaultOptions.controls)
	);
}
