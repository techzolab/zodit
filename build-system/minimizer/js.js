/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

const MinimizeJSPlugin = require('terser-webpack-plugin');

module.exports = ({ ESNext, isTest, banner }) =>
	new MinimizeJSPlugin({
		parallel: true,
		extractComments: false,

		exclude: './src/langs',

		terserOptions: {
			ecma: ESNext ? 8 : 5,

			mangle: {
				reserved: ['Zodit']
			},

			compress: {
				unsafe_arrows: ESNext,
				unsafe_methods: ESNext,
				unsafe: ESNext,

				drop_console: !isTest,
				drop_debugger: !isTest,

				pure_getters: true,
				unsafe_comps: true,

				pure_funcs: ['assert'],

				passes: 7
			},

			output: {
				comments: false,
				beautify: false,
				preamble: banner
			}
		}
	});
