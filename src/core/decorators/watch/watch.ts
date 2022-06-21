/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * [[include:core/decorators/watch/README.md]]
 * @packageDocumentation
 * @module decorators/watch
 */

import type {
	CanUndef,
	DecoratorHandler,
	IComponent,
	IDictionary,
	IViewBased
} from 'zodit/types';
import { isFunction } from 'zodit/core/helpers/checker/is-function';
import { isPlainObject } from 'zodit/core/helpers/checker/is-plain-object';
import { isViewObject } from 'zodit/core/helpers/checker/is-view-object';
import { observable } from 'zodit/core/event-emitter/observable';
import { STATUSES } from 'zodit/core/component/statuses';
import { splitArray } from 'zodit/core/helpers/array/split-array';
import { error } from 'zodit/core/helpers/utils/error';

export function getPropertyDescriptor(
	obj: unknown,
	prop: string
): CanUndef<PropertyDescriptor> {
	let desc;

	do {
		desc = Object.getOwnPropertyDescriptor(obj, prop);
		obj = Object.getPrototypeOf(obj);
	} while (!desc && obj);

	return desc;
}

/**
 * Watch decorator. Added observer for some change in field value
 */
export function watch(
	observeFields: string[] | string,
	context?: object | ((c: IDictionary) => object)
): DecoratorHandler {
	return <T extends IComponent & IDictionary>(
		target: T,
		propertyKey: string
	) => {
		if (!isFunction(target[propertyKey])) {
			throw error('Handler must be a Function');
		}

		const process = (component: IComponent): void => {
			const callback = (key: string, ...args: any[]): void | any => {
				if (!component.isInDestruct) {
					return (component as any)[propertyKey](key, ...args);
				}
			};

			splitArray(observeFields).forEach(field => {
				if (/:/.test(field)) {
					const [objectPath, eventName] = field.split(':');
					let ctx = context;

					const view = isViewObject(component)
						? component
						: (component as unknown as { zodit: IViewBased }).zodit;

					if (objectPath.length) {
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						ctx = component.get<CanUndef<object>>(objectPath)!;
					}

					if (isFunction(ctx)) {
						ctx = ctx(component);
					}

					view.events.on(ctx || component, eventName, callback);

					if (!ctx) {
						view.events.on(eventName, callback);
					}

					component.hookStatus('beforeDestruct', () => {
						view.events
							.off(ctx || component, eventName, callback)
							.off(eventName, callback);
					});

					return;
				}

				const parts = field.split('.'),
					[key] = parts as unknown as Array<keyof IComponent>,
					teil = parts.slice(1);

				let value: any = component[key];

				if (isPlainObject(value)) {
					const observableValue = observable(value);
					observableValue.on(`change.${teil.join('.')}`, callback);
				}

				const descriptor = getPropertyDescriptor(target, key);

				Object.defineProperty(component, key, {
					configurable: true,
					set(v: any): void {
						const oldValue = value;

						if (oldValue === v) {
							return;
						}

						value = v;
						if (descriptor && descriptor.set) {
							descriptor.set.call(component, v);
						}

						if (isPlainObject(value)) {
							value = observable(value);
							value.on(`change.${teil.join('.')}`, callback);
						}

						callback(key, oldValue, value);
					},

					get(): any {
						if (descriptor && descriptor.get) {
							return descriptor.get.call(component);
						}

						return value;
					}
				});
			});
		};

		if (isFunction(target.hookStatus)) {
			target.hookStatus(STATUSES.ready, process);
		} else {
			process(target);
		}
	};
}

export default watch;
