/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/utils
 */

/**
 * Module returns method that is used to determine the browser
 * @example
 * ```javascript
 * console.log(Zodit.modules.Helpers.browser('mse'));
 * console.log(Zodit.modules.Helpers.browser('chrome'));
 * console.log($Zodit.modules.Helpers.browser('opera'));
 * console.log(Zodit.modules.Helpers.browser('firefox'));
 * console.log(Zodit.modules.Helpers.browser('mse') && Zodit.modules.Helpers.browser('version') > 10);
 * ```
 */
export const browser = (browser: string): boolean | string => {
	const ua: string = navigator.userAgent.toLowerCase(),
		match: any =
			/(chrome)[\s/]([\w.]+)/.exec(ua) ||
			/(firefox)[\s/]([\w.]+)/.exec(ua) ||
			/(webkit)[\s/]([\w.]+)/.exec(ua) ||
			/(opera)(?:.*version)[\s/]([\w.]+)/.exec(ua) ||
			/(msie)[\s]([\w.]+)/.exec(ua) ||
			/(trident)\/([\w.]+)/.exec(ua) ||
			ua.indexOf('compatible') < 0 ||
			[];

	if (browser === 'version') {
		return match[2];
	}

	if (browser === 'webkit') {
		return match[1] === 'chrome' || match[1] === 'webkit';
	}

	if (browser === 'ff') {
		return match[1] === 'firefox';
	}

	if (browser === 'msie') {
		return match[1] === 'trident' || match[1] === 'msie';
	}

	return match[1] === browser;
};
