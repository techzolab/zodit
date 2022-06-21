/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/fix/wrap-nodes
 */

import type { HTMLTagNames } from 'zodit/types';
import { Config } from 'zodit/config';

declare module 'zodit/config' {
	interface Config {
		wrapNodes: {
			exclude: HTMLTagNames[];
		};
	}
}

Config.prototype.wrapNodes = {
	exclude: ['hr', 'style', 'br']
};
