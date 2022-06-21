/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/size
 */

export const innerWidth = (element: HTMLElement, win: Window): number => {
	const computedStyle: CSSStyleDeclaration = win.getComputedStyle(element);

	let elementWidth: number = element.clientWidth; // width with padding

	elementWidth -=
		parseFloat(computedStyle.paddingLeft || '0') +
		parseFloat(computedStyle.paddingRight || '0');

	return elementWidth;
};
