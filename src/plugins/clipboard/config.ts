/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/clipboard
 */

import type { IControlType, IZodit } from 'zodit/types';
import { Config } from 'zodit/config';

Config.prototype.controls.cut = {
	command: 'cut',
	isDisabled: (editor: IZodit) => editor.s.isCollapsed(),
	tooltip: 'Cut selection'
} as IControlType;

Config.prototype.controls.copy = {
	command: 'copy',
	isDisabled: (editor: IZodit) => editor.s.isCollapsed(),
	tooltip: 'Copy selection'
} as IControlType;

Config.prototype.controls.selectall = {
	icon: 'select-all',
	command: 'selectall',
	tooltip: 'Select all'
} as IControlType;
