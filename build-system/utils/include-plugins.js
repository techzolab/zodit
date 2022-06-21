/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

const fs = require('fs-extra');
const path = require('path');

const entryFiles = [];

module.exports.includePlugins = dir => {
	const make = require(path.resolve(dir, './make.js'));

	const pluginsEntries = make.paths.reduce((entries, entry) => {
		const fullPath = path.resolve(process.cwd(), entry);
		const name = path.basename(fullPath);
		const rootPath = path.resolve(process.cwd(), './src');
		const entryPath = fullPath.replace(rootPath, '.') + '/' + name;

		let importFile = path.resolve(fullPath, `./${name}.ts`);

		if (!fs.pathExistsSync(importFile)) {
			importFile = path.resolve(fullPath, './index.ts');

			if (!fs.pathExistsSync(importFile)) {
				return entries;
			}
		}

		entryFiles.push(importFile.replace(rootPath, './src'));

		entries[entryPath] = {
			import: importFile.replace(rootPath, './src'),
			dependOn: 'zodit'
		};

		return entries;
	}, {});

	return [pluginsEntries, entryFiles];
};
