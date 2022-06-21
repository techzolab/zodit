/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module modules/file-browser
 */

import type { IFileBrowser } from 'zodit/types';
import { Dom } from 'zodit/core/dom';
import { loadItems } from 'zodit/modules/file-browser/fetch/load-items';

/**
 * Loads a list of directories
 */
export async function loadTree(fb: IFileBrowser): Promise<any> {
	fb.tree.setMod('active', true);

	Dom.detach(fb.tree.container);

	const items = loadItems(fb);

	if (fb.o.showFoldersPanel) {
		fb.tree.setMod('loading', true);

		const tree = fb.dataProvider
			.tree(fb.state.currentPath, fb.state.currentSource)
			.then(resp => {
				fb.state.sources = resp;
			})
			.catch(fb.status)
			.finally(() => fb.tree.setMod('loading', false));

		return Promise.all([tree, items]);
	}

	fb.tree.setMod('active', false);

	return items;
}
