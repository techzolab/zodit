/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

module.exports = function (source) {
	this.cacheable && this.cacheable(true);
	return source.replace(/--([a-z0-9_-]+)/g, '--jd-$1');
};

module.exports.seperable = true;
