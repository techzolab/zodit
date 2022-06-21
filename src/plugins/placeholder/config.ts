/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/placeholder
 */

import { Config } from 'zodit/config';

/**
 * Show placeholder
 */
declare module 'zodit/config' {
	interface Config {
		/**
		 * Show placeholder
		 * @example
		 * ```javascript
		 * var editor = new Zodit('#editor', {
		 *    showPlaceholder: false
		 * });
		 * ```
		 */
		showPlaceholder: boolean;

		/**
		 * Use a placeholder from original input field, if it was set
		 * @example
		 * ```javascript
		 * //<textarea id="editor" placeholder="start typing text ..." cols="30" rows="10"></textarea>
		 * var editor = new Zodit('#editor', {
		 *    useInputsPlaceholder: true
		 * });
		 * ```
		 */
		useInputsPlaceholder: boolean;

		/**
		 * Default placeholder
		 * @example
		 * ```javascript
		 * var editor = new Zodit('#editor', {
		 *    placeholder: 'start typing text ...'
		 * });
		 * ```
		 */
		placeholder: string;
	}
}

Config.prototype.showPlaceholder = true;
Config.prototype.placeholder = 'Type something';
Config.prototype.useInputsPlaceholder = true;
