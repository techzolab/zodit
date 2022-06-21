/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

import type { ImageEditorOptions } from 'zodit/types';
import { Config } from 'zodit/config';

declare module 'zodit/config' {
	interface Config {
		imageeditor: ImageEditorOptions;
	}
}

Config.prototype.imageeditor = {
	min_width: 20,
	min_height: 20,
	closeAfterSave: false,
	width: '85%',
	height: '85%',
	crop: true,
	resize: true,
	resizeUseRatio: true,
	resizeMinWidth: 20,
	resizeMinHeight: 20,
	cropUseRatio: true,
	cropDefaultWidth: '70%',
	cropDefaultHeight: '70%'
};
