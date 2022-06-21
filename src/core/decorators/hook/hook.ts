/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * [[include:core/decorators/hook/README.md]]
 * @packageDocumentation
 * @module decorators/hook
 */

import type {
	ComponentStatus,
	IDictionary,
	IViewBased,
	IViewComponent
} from 'zodit/types';
import type { Component } from 'zodit/core/component';
import { isFunction } from 'zodit/core/helpers/checker';
import { error } from 'zodit/core/helpers/utils/error';

/**
 * Call on some component status
 */
export function hook(status: ComponentStatus) {
	return <T extends Component & IDictionary>(
		target: IDictionary,
		propertyKey: string
	): void => {
		if (!isFunction(target[propertyKey])) {
			throw error('Handler must be a Function');
		}

		target.hookStatus(status, (component: IViewComponent | IViewBased) => {
			(component as any)[propertyKey].call(component);
		});
	};
}
