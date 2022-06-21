/*!
 * Zodit Editor (https://techzolab.net/opensource/zodit)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2021-2022 Nazrul Islam Nadeem. All rights reserved. https://techzolab.net
 */

/**
 * @module plugins/redo-undo
 */

import type { IControlType, IZodit, IPlugin } from 'zodit/types';
import { Config } from 'zodit/config';
import * as consts from 'zodit/core/constants';
import { Plugin } from 'zodit/core/plugin';

Config.prototype.controls.redo = {
	mode: consts.MODE_SPLIT,
	isDisabled: (editor: IZodit): boolean => !editor.history.canRedo(),
	tooltip: 'Redo'
} as IControlType;

Config.prototype.controls.undo = {
	mode: consts.MODE_SPLIT,
	isDisabled: (editor: IZodit): boolean => !editor.history.canUndo(),
	tooltip: 'Undo'
} as IControlType;

/**
 * Custom process Redo and Undo functionality
 */
export class redoUndo extends Plugin {
	/** @override */
	override buttons: IPlugin['buttons'] = [
		{
			name: 'undo',
			group: 'history'
		},
		{
			name: 'redo',
			group: 'history'
		}
	];

	protected override beforeDestruct(): void {
		// do nothing
	}

	protected override afterInit(editor: IZodit): void {
		const callback = (command: string): void | false => {
			editor.history[command as 'redo' | 'undo']();

			return false;
		};

		editor.registerCommand('redo', {
			exec: callback,
			hotkeys: ['ctrl+y', 'ctrl+shift+z', 'cmd+y', 'cmd+shift+z']
		});

		editor.registerCommand('undo', {
			exec: callback,
			hotkeys: ['ctrl+z', 'cmd+z']
		});
	}
}
