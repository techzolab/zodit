/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * [[include:core/decorators/persistent/README.md]]
 * @packageDocumentation
 * @module decorators/persistent
 */

import type { IComponent, IDictionary, IViewBased } from 'zodit/types';
import { STATUSES } from 'zodit/core/component';
import { isViewObject } from 'zodit/core/helpers/checker/is-view-object';

export function persistent<T extends IComponent>(
	target: T,
	propertyKey: string
): void {
	target.hookStatus(STATUSES.ready, (component: T) => {
		const zodit = isViewObject(component)
				? component
				: (component as unknown as { zodit: IViewBased }).zodit,
			storageKey = `${zodit.options.namespace}${component.componentName}_prop_${propertyKey}`,
			initialValue = (component as IDictionary)[propertyKey];

		Object.defineProperty(component, propertyKey, {
			get() {
				return zodit.storage.get(storageKey) ?? initialValue;
			},
			set(value): void {
				zodit.storage.set(storageKey, value);
			}
		});
	});
}
