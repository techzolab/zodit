/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module types
 */

import type { IComponent, IDictionary } from './types';

export type DecoratorHandler = <T extends IComponent & IDictionary>(
	target: T,
	propertyKey: string
) => void | PropertyDescriptor;
