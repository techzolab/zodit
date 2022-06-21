/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import { Config } from 'zodit/config';

/**
 * @module plugins/image-processor
 */

declare module 'zodit/config' {
	interface Config {
		imageProcessor: {
			replaceDataURIToBlobIdInView: boolean;
		};
	}
}

Config.prototype.imageProcessor = {
	replaceDataURIToBlobIdInView: true
};
