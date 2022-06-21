/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

const path = require('path');

module.exports = ({ superDirname, uglify, ES }) => {
	return {
		test: /\.ts$/,
		loader: 'ts-loader',
		options: {
			transpileOnly: uglify,
			allowTsInNodeModules: true,
			compilerOptions: {
				target: ES
			}
		},
		include: [path.resolve(superDirname, './src/')],
		exclude: [/langs\/[a-z]{2}\.ts/, /langs\/[a-z]{2}_[a-z]{2}\.ts/]
	};
};
