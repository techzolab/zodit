/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/resizer
 */

import type { HTMLTagNames } from 'zodit/types';
import { Config } from '../../config';

declare module 'zodit/config' {
	interface Config {
		/**
		 * Use true frame for editing iframe size
		 */
		allowResizeTags: HTMLTagNames[];

		resizer: {
			/**
			 * Show size
			 */
			showSize: boolean;
			hideSizeTimeout: number;

			/**
			 * Save width and height proportions when resizing
			 * ```js
			 * Zodit.make('#editor', {
			 *   allowResizeTags: ['img', 'iframe', 'table', 'zodit'],
			 *   resizer: {
			 *     useAspectRatio: false, // don't save,
			 *     useAspectRatio: ['img'], // save only for images (default value)
			 *     useAspectRatio: true // save for all
			 *   }
			 * });
			 * ```
			 */
			useAspectRatio: boolean | HTMLTagNames[];

			/**
			 * When resizing images, change not the styles but the width and height attributes
			 */
			forImageChangeAttributes: boolean;

			/**
			 * The minimum width for the editable element
			 */
			min_width: number;

			/**
			 * The minimum height for the item being edited
			 */
			min_height: number;
		};
	}
}

Config.prototype.allowResizeTags = ['img', 'iframe', 'table', 'zodit'];

Config.prototype.resizer = {
	showSize: true,
	hideSizeTimeout: 1000,
	forImageChangeAttributes: true,
	min_width: 10,
	min_height: 10,
	useAspectRatio: ['img']
};
