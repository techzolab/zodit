/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/string
 */

export const kebabCase = (key: string): string => {
	return key
		.replace(/([A-Z])([A-Z])([a-z])/g, '$1-$2$3')
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/[\s_]+/g, '-')
		.toLowerCase();
};

export const CamelCaseToKebabCase = (key: string): string => {
	return key
		.replace(/([A-Z])([A-Z])([a-z])/g, '$1-$2$3')
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.toLowerCase();
};
