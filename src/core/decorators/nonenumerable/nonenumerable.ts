/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * [[include:core/decorators/nonenumerable/README.md]]
 * @packageDocumentation
 * @module decorators/nonenumerable
 */

export const nonenumerable = (target: object, propertyKey: string): void => {
	const descriptor =
		Object.getOwnPropertyDescriptor(target, propertyKey) || {};

	if (descriptor.enumerable !== false) {
		Object.defineProperty(target, propertyKey, {
			enumerable: false,
			set(value: any) {
				Object.defineProperty(this, propertyKey, {
					enumerable: false,
					writable: true,
					value
				});
			}
		});
	}
};
