/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

const glob = require('glob');
const path = require('path');
const fs = require('fs');

const dir = path.resolve(__dirname, '../../') + '/';

const list = [];
// options is optional
const srcFiles = glob.sync(dir + '?(src|test)/**/*.test.js');
list.push(
	...srcFiles.map(p =>
		p.replace(dir + 'src/', '../src/').replace(dir + 'test/', './')
	)
);

fs.writeFileSync(
	dir + 'test/loader.js',
	`const fileCasesZodit = ${JSON.stringify(list)};`
);

console.log(`Found: ${list.length} files`);
