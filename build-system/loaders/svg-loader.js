/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */
module.exports = function (content) {
	this.cacheable && this.cacheable();
	this.value = content;

	return (
		'module.exports = ' +
		JSON.stringify(
			content
				.replace(/[\n\t]+/g, ' ')
				.replace(/[\s]+/g, ' ')
				.trim()
		)
	);
};

module.exports.seperable = true;
