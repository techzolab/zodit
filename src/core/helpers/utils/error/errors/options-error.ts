/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/utils
 */

export class OptionsError extends TypeError {
	constructor(m: string) {
		super(m);
		Object.setPrototypeOf(this, OptionsError.prototype);
	}
}
