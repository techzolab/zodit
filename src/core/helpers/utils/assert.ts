/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module helpers/utils
 */

class AssertionError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'AssertionError';
	}
}

/** Asserts that condition is truthy (or evaluates to true). */
function assert<T>(
	condition: T | false | 0 | '' | null | undefined,
	message: string
): asserts condition {
	if (!condition) {
		throw new AssertionError(`Assertion failed: ${message}`);
	}
}

export { assert };
