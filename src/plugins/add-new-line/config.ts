/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/add-new-line
 */

import type { HTMLTagNames } from 'zodit/types';
import { Config } from 'zodit/config';

declare module 'zodit/config' {
	interface Config {
		/**
		 * Create helper
		 */
		addNewLine: boolean;

		/**
		 * What kind of tags it will be impact
		 */
		addNewLineTagsTriggers: HTMLTagNames[];

		/**
		 * On dbl click on empty space of editor it add new P element
		 * @example
		 * ```js
		 * Zodit.make('#editor', {
		 *   addNewLineOnDBLClick: false // disable
		 * })
		 * ```
		 */
		addNewLineOnDBLClick: boolean;

		/**
		 * Absolute delta between cursor position and edge(top or bottom)
		 * of element when show line
		 */
		addNewLineDeltaShow: number;
	}
}

Config.prototype.addNewLine = true;
Config.prototype.addNewLineOnDBLClick = true;
Config.prototype.addNewLineTagsTriggers = [
	'table',
	'iframe',
	'img',
	'hr',
	'pre',
	'zodit'
];
Config.prototype.addNewLineDeltaShow = 20;
