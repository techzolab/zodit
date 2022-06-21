/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

const path = require('path');

module.exports = variables => {
	return [
		require('./css')(variables),
		require('./extra-typescript')(variables),
		require('./langs')(variables),
		require('./internal-typescript')(variables),
		require('./svg')(variables)
	];
};
