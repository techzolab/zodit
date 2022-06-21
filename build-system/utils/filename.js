/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

module.exports.fileName = ({ argv, ES, isTest, excludeLangs, uglify }) => {
	if (argv.filename) {
		return argv.filename;
	}

	return name =>
		name +
		(ES === 'es5' || isTest ? '' : '.' + ES) +
		(excludeLangs ? '.en' : '') +
		(uglify ? '.min' : '');
};
