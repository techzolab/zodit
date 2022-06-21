/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

const path = require('path');

module.exports = ({ ES, superDirname }) => {
	return {
		test: /\.(js|ts)$/,
		loader: 'ts-loader',
		options: {
			transpileOnly: true,
			allowTsInNodeModules: true,
			compilerOptions: {
				target: ES
			}
		},
		include: [path.resolve(superDirname, './node_modules')]
	};
};
