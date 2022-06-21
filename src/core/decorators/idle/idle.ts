/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * [[include:core/decorators/idle/README.md]]
 * @packageDocumentation
 * @module decorators/idle
 */

import type { DecoratorHandler, IDictionary, IComponent } from 'zodit/types';
import { Component, STATUSES } from 'zodit/core/component';
import { error, isFunction } from 'zodit/core/helpers';

export function idle<V extends IComponent = IComponent>(): DecoratorHandler {
	return <T extends Component & IDictionary>(
		target: IDictionary,
		propertyKey: string
	): void => {
		if (!isFunction(target[propertyKey])) {
			throw error('Handler must be a Function');
		}

		target.hookStatus(STATUSES.ready, (component: V) => {
			const { async } = component;

			const originalMethod = (component as any)[propertyKey];

			(component as any)[propertyKey] = (...args: unknown[]): number =>
				async.requestIdleCallback(
					originalMethod.bind(component, ...args)
				);
		});
	};
}
