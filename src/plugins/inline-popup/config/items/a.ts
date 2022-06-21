/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/inline-popup
 */

import type { IControlType, IZodit } from 'zodit/types';
import { attr } from 'zodit/core/helpers/utils';

export default [
	{
		name: 'eye',
		tooltip: 'Open link',
		exec: (editor: IZodit, current): void => {
			const href = attr(current as HTMLElement, 'href');

			if (current && href) {
				editor.ow.open(href);
			}
		}
	},
	{
		name: 'link',
		tooltip: 'Edit link',
		icon: 'pencil'
	},
	'unlink',
	'brush',
	'file'
] as Array<IControlType | string>;
