/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */
// @ts-check
/** eslint-disable tsdoc/syntax */

const path = require('path');

const { variables } = require('./variables');
const { fileName } = require('./utils/filename');
const { includePlugins } = require('./utils/include-plugins');

/**
 * @param {boolean} onlyTS - build only TypeScript files
 */
module.exports = (env, argv, dir = process.cwd(), onlyTS = false) => {
	const vars = variables(argv, dir);

	const { ES, mode, isTest, isProd, debug, ESNext, uglify, outputPath } =
		vars;

	const [pluginsEntries] = includePlugins(dir);

	console.warn(`ES:${ES} Mode:${mode} Test:${isTest} Uglify:${uglify}`);

	return {
		cache: !isProd,
		mode,
		target: ['web', 'es5'],
		context: dir,

		stats: {
			colors: true
		},

		devtool: debug ? 'inline-source-map' : false,

		entry: {
			...(!isProd || (!uglify && !ESNext)
				? { vdom: ['./src/core/vdom/index'] }
				: {}),
			zodit: debug
				? ['webpack-hot-middleware/client.js', './src/index']
				: ['./src/index'],
			...pluginsEntries
		},

		output: {
			path: outputPath,
			filename: fileName(vars)('[name]') + '.js',
			publicPath: '/build/',
			libraryTarget: 'umd'
		},

		resolve: {
			extensions: [
				'.js',
				'.ts',
				'.d.ts',
				'.json',
				'.less',
				'.css',
				'.svg'
			],
			alias: {
				'zodit/src': path.resolve(__dirname, '../src/'),
				zodit: path.resolve(__dirname, '../src/')
			}
		},

		optimization: {
			minimize: !debug && uglify,
			moduleIds: debug ? 'named' : false,
			mangleExports: true,
			minimizer: require('./minimizer').map(mnm =>
				mnm({ isTest, ESNext })
			)
		},

		module: {
			rules: require('./rules/index')(vars)
		},

		plugins: require('./plugins/index')(vars)
	};
};
