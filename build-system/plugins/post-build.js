/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

const PostBuild = require('../utils/post-build');
const postcss = require('postcss');
const path = require('path');
const { fileName } = require('../utils/filename');
const fs = require('fs');

module.exports = ({
	argv,
	ES,
	isTest,
	excludeLangs,
	uglify,
	outputPath,
	banner
}) => {
	return new PostBuild(() => {
		const processor = postcss([
			require('autoprefixer')({
				overrideBrowserslist: [
					'>1%',
					'last 4 versions',
					'Firefox ESR',
					'ie >= 11'
				]
			}),
			require('postcss-css-variables')
		]);

		const file = path.resolve(
			outputPath,
			fileName({ argv, ES, isTest, excludeLangs, uglify })('zodit') +
				'.css'
		);

		fs.readFile(file, (err, css) => {
			if (err) {
				console.log(err);
				return;
			}

			processor.process(css, { from: file, to: file }).then(result => {
				fs.writeFile(file, banner + result.css, () => true);
			});
		});
	});
};
