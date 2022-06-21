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
	ButtonsGroup,
	ButtonsGroups,
	IControlType,
	IZodit
} from 'zodit/types';
import { isArray } from 'zodit/core/helpers/checker/is-array';

export const isButtonGroup = (
	item: ButtonsGroup | string | IControlType
): item is ButtonsGroup => {
	return isArray((<ButtonsGroup>item).buttons);
};

export function flatButtonsSet(
	buttons: ButtonsGroups,
	zodit: IZodit
): Set<string | IControlType> {
	const groups = zodit.getRegisteredButtonGroups();

	return new Set(
		buttons.reduce(
			(acc: Buttons, item: ButtonsGroup | string | IControlType) => {
				if (isButtonGroup(item)) {
					acc = acc.concat([
						...(<ButtonsGroup>item).buttons,
						...(groups[item.group] ?? [])
					]);
				} else {
					acc.push(item);
				}

				return acc;
			},
			[] as Buttons
		)
	);
}
