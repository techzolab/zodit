/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/inline-popup
 */

import type { IControlType, IZodit } from 'zodit/types';
import { align } from './img';

export default [
	{
		name: 'bin',
		tooltip: 'Delete',
		exec: (editor: IZodit, image): void => {
			image && editor.s.removeNode(image);
		}
	},
	align
] as Array<IControlType | string>;
