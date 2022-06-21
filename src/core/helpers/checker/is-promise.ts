/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/checker
 */

export function isPromise(val: any | Promise<any>): val is Promise<any> {
	return val && typeof (val as Promise<any>).then === 'function';
}
