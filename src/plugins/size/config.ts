/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/size
 */

import { Config } from 'zodit/config';

declare module 'zodit/config' {
	interface Config {
		allowResizeX: boolean;
		allowResizeY: boolean;

		saveHeightInStorage: boolean;

		width: number | string;
		height: number | string;
		minWidth: number | string;
		minHeight: number | string;
		maxWidth: number | string;
		maxHeight: number | string;
	}
}

/**
 * Editor's width
 *
 * @example
 * ```javascript
 * Zodit.make('.editor', {
 *    width: '100%',
 * })
 * ```
 * @example
 * ```javascript
 * Zodit.make('.editor', {
 *    width: 600, // equivalent for '600px'
 * })
 * ```
 * @example
 * ```javascript
 * Zodit.make('.editor', {
 *    width: 'auto', // autosize
 * })
 * ```
 */

Config.prototype.width = 'auto';
Config.prototype.minWidth = 200;
Config.prototype.maxWidth = '100%';

Config.prototype.allowResizeX = false;
Config.prototype.allowResizeY = true;

/**
 * Editor's height
 *
 * @example
 * ```javascript
 * Zodit.make('.editor', {
 *    height: '100%',
 * })
 * ```
 * @example
 * ```javascript
 * Zodit.make('.editor', {
 *    height: 600, // equivalent for '600px'
 * })
 * ```
 * @example
 * ```javascript
 * Zodit.make('.editor', {
 *    height: 'auto', // default - autosize
 * })
 * ```
 */
Config.prototype.height = 'auto';

/**
 * Editor's min-height
 *
 * @example
 * ```javascript
 * Zodit.make('.editor', {
 *    minHeight: '30%' //min-height: 30%
 * })
 * ```
 * @example
 * ```javascript
 * Zodit.make('.editor', {
 *    minHeight: 200 //min-height: 200px
 * })
 * ```
 */
Config.prototype.minHeight = 200;
Config.prototype.maxHeight = 'auto';

/**
 * if set true and height !== auto then after reload editor will be have latest height
 */
Config.prototype.saveHeightInStorage = false;
