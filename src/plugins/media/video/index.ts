/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/media/video
 */

import type { IZodit } from 'zodit/types';
import './config';

export function video(editor: IZodit): void {
	editor.registerButton({
		name: 'video',
		group: 'media'
	});
}
