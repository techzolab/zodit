/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/search
 */

import type { FuzzySearch, IControlType, IZodit } from 'zodit/types';
import { Config } from 'zodit/config';

declare module 'zodit/config' {
	interface Config {
		/**
		 * Enable custom search plugin
		 * ![search](https://user-images.githubusercontent.com/794318/34545433-cd0a9220-f10e-11e7-8d26-7e22f66e266d.gif)
		 */
		useSearch: boolean;

		search: {
			lazyIdleTimeout: number;

			/**
			 * Function to search for a string within a substring. The default implementation is [[fuzzySearchIndex]]
			 * But you can write your own. It must implement the [[FuzzySearch]] interface.
			 *
			 * ```ts
			 * Zodit.make('#editor', {
			 *   search: {
			 *     fuzzySearch: (needle, haystack, offset) => {
			 *       return [haystack.indexOf(needle, offset), needle.length];
			 *     }
			 *   }
			 * })
			 * ```
			 */
			fuzzySearch?: FuzzySearch;
		};
	}
}

Config.prototype.useSearch = true;
Config.prototype.search = {
	lazyIdleTimeout: 0
};

Config.prototype.controls.find = {
	tooltip: 'Find',
	icon: 'search',

	exec(zodit: IZodit, _, { control }) {
		const value = control.args && control.args[0];

		switch (value) {
			case 'findPrevious':
				zodit.e.fire('searchPrevious');
				break;

			case 'findNext':
				zodit.e.fire('searchNext');
				break;

			case 'replace':
				zodit.execCommand('openReplaceDialog');
				break;

			default:
				zodit.execCommand('openSearchDialog');
		}
	},

	list: {
		search: 'Find',
		findNext: 'Find Next',
		findPrevious: 'Find Previous',
		replace: 'Replace'
	},

	childTemplate: (_, k, v) => v
} as IControlType;
