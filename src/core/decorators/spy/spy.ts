/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import {
	isBoolean,
	isFunction,
	isNumber,
	isPlainObject,
	isString
} from 'zodit/core/helpers/checker';
import { getClassName } from 'zodit/core/helpers/utils';

/**
 * Allow spy for the class
 */
export function spy(target: Function): void {
	const methods = Reflect.ownKeys(target.prototype);

	methods.forEach(key => {
		// Ignore special case target method
		if (key === 'constructor') {
			return;
		}

		const descriptor = Object.getOwnPropertyDescriptor(
			target.prototype,
			key
		);

		// Only methods need binding
		if (descriptor && isFunction(descriptor.value)) {
			target.prototype[key] = function (
				this: typeof target,
				...args: any[]
			): any {
				console.log(
					`Class: ${getClassName(target.prototype)} call: ${String(
						key
					)}(${args.map(a =>
						isPlainObject(a) ||
						isString(a) ||
						isBoolean(a) ||
						isNumber(a)
							? JSON.stringify(a)
							: {}.toString.call(a)
					)})`
				);

				return descriptor.value.apply(this, args);
			};
		}
	});
}
