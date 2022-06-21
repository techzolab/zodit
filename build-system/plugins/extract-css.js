/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { fileName } = require('../utils/filename');

module.exports = vars => {
	return new MiniCssExtractPlugin({
		filename: fileName(vars)('[name]') + '.css'
	});
};
