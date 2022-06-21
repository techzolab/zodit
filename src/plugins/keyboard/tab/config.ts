/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/keyboard/tab
 */

import { Config } from 'zodit/config';

declare module 'zodit/config' {
	interface Config {
		tab: {
			/**
			 * Pressing Tab inside LI will add an internal list
			 */
			tabInsideLiInsertNewList: boolean;
		};
	}
}

Config.prototype.tab = {
	tabInsideLiInsertNewList: true
};
