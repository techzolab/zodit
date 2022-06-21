/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */
module.exports = class PostBuild {
	constructor(fn) {
		this.fn = fn;
	}

	apply(compiler) {
		const handler = stats => {
			if (typeof this.fn === 'function') {
				try {
					this.fn(stats);
				} catch (e) {
					console.log(e);
				}
			}
		};

		if (compiler.hooks) {
			compiler.hooks.done.tap('PostBuild', handler);
		} else {
			compiler.plugin('done', handler);
		}
	}
};
