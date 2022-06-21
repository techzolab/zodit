/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

const webpack = require('webpack');

module.exports = ({ banner }) => {
	return new webpack.BannerPlugin({
		banner,
		raw: true,
		entryOnly: true
	});
};
