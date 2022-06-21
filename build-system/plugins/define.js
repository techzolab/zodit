/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

const webpack = require('webpack');

module.exports = ({ pkg, isProd, ESNext, isTest, ES, mode, excludeLangs }) => {
	return new webpack.DefinePlugin({
		appVersion: JSON.stringify(pkg.version),
		isProd,
		isTest,
		isESNext: ESNext,
		'process.env': {
			HOMEPAGE: JSON.stringify(pkg.homepage),
			TARGET_ES: JSON.stringify(ES),
			NODE_ENV: JSON.stringify(mode),
			EXCLUDE_LANGS: JSON.stringify(excludeLangs)
		}
	});
};
