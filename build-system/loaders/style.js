/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = ({ debug, isTest, superDirname }) => [
	debug || isTest ? 'style-loader' : MiniCssExtractPlugin.loader,
	{
		loader: 'css-loader',
		options: {
			sourceMap: debug,
			importLoaders: 1
		}
	},
	{
		loader: path.resolve(
			superDirname,
			'./build-system/loaders/css-variables-prefixes'
		)
	},
	{
		loader: 'less-loader',
		options: {
			sourceMap: debug
		}
	}
];
