/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/utils
 */

import { AbortError, ConnectionError, OptionsError } from './errors';

/**
 * Helper for create Error object
 */
export function error(message: string): Error {
	return new TypeError(message);
}

export function connection(message: string): Error {
	return new ConnectionError(message);
}

export function options(message: string): Error {
	return new OptionsError(message);
}

export function abort(message: string): Error {
	return new AbortError(message);
}

export function isAbort(error: unknown): boolean {
	return error instanceof AbortError;
}
