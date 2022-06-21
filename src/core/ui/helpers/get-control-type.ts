/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module ui
 */

import type {
	CanUndef,
	Controls,
	IControlType,
	IControlTypeStrong,
	IDictionary
} from 'zodit/types';
import { ConfigFlatten, isString } from 'zodit/core/helpers';
import { Config } from 'zodit/config';

/**
 * Get control for button name
 */
export function getControlType(
	button: IControlType | string,
	controls: CanUndef<Controls>
): IControlTypeStrong {
	let buttonControl: IControlTypeStrong;

	if (!controls) {
		controls = Config.defaultOptions.controls;
	}

	if (!isString(button)) {
		buttonControl = { name: 'empty', ...ConfigFlatten(button) };

		if (controls[buttonControl.name] !== undefined) {
			buttonControl = {
				...ConfigFlatten(controls[buttonControl.name]),
				...ConfigFlatten(buttonControl)
			} as IControlTypeStrong;
		}
	} else {
		buttonControl = findControlType(button, controls) || {
			name: button,
			command: button,
			tooltip: button
		};
	}

	return buttonControl;
}

export function findControlType(
	path: string,
	controls: Controls
): IControlTypeStrong | void {
	// eslint-disable-next-line prefer-const
	let [namespaceOrKey, key] = path.split(/\./) as string[];

	let store: IDictionary<IControlType> = controls;

	if (key != null) {
		if (controls[namespaceOrKey] !== undefined) {
			store = controls[namespaceOrKey] as IDictionary<IControlType>;
		}
	} else {
		key = namespaceOrKey;
	}

	return store[key]
		? {
				name: key,
				...ConfigFlatten(store[key])
		  }
		: undefined;
}
