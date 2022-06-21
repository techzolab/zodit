/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = () =>
	new CssMinimizerPlugin({
		parallel: true,
		minimizerOptions: {
			preset: [
				'advanced',
				{
					discardComments: { removeAll: true },
					zindex: false
				}
			]
		}
	});
