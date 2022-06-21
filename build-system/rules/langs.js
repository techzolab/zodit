/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

const path = require('path');

module.exports = ({ superDirname }) => {
	return {
		test: /\.(ts)$/,
		use: [
			{
				loader: path.resolve(__dirname, '../loaders/lang-loader')
			}
		],
		include: path.resolve(superDirname, './src/langs'),
		exclude: path.resolve(superDirname, './src/langs/index.ts')
	};
};
