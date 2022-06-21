/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/fix/clean-html
 */

import type { IZodit, Nullable, IDictionary } from 'zodit/types';
import * as filters from 'zodit/plugins/fix/clean-html/helpers/visitor/filters';

type Filter = keyof typeof filters;
const keys = Object.keys(filters) as Filter[];

/**
 * @private
 */
export function visitNodeWalker(
	zodit: IZodit,
	nodeElm: Node,
	allowTags: IDictionary | false,
	denyTags: IDictionary | false,
	currentSelectionNode: Nullable<Node>
): boolean {
	let hadEffect = false;
	for (const key of keys) {
		const filter = filters[key];

		const tmp = hadEffect;

		hadEffect = filter(
			zodit,
			nodeElm,
			hadEffect,
			allowTags,
			denyTags,
			currentSelectionNode
		);

		if (!isProd && !tmp && hadEffect) {
			console.warn(`CleanHTML: Effect "${key}"`);
		}

		if (!nodeElm.isConnected) {
			return true;
		}
	}

	return hadEffect;
}
