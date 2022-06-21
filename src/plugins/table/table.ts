/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/table
 */

import type { IZodit } from 'zodit/types';

export function table(editor: IZodit): void {
	editor.registerButton({
		name: 'table',
		group: 'insert'
	});
}
